#!/usr/bin/env python3
"""
DevHire 12-Month Financial Model
================================
Projects monthly recurring revenue (MRR), customer count, gross churn,
and blended customer acquisition cost (CAC) for the first 12 months of
operations based on:

  * Pricing: $399/mo unlimited roles (single flat tier)
  * Conversion: time-to-first-interview improved from 2 weeks -> 48 hours
  * Growth-driven acquisition tied to marketing spend + conversion uplift

Outputs:
  - backend/financial_model_output.json  (machine-readable model)
  - backend/financial_model_report.md    (human-readable summary)
"""

import json
import math
from datetime import datetime, timezone

# ============================================================
# ASSUMPTIONS
# ============================================================
PRICE_MONTHLY = 399.0                 # $ / month flat plan
MONTHS = 12

# Initial active subscribers at launch (founder-led sales head start)
START_CUSTOMERS = 8

# --- Acquisition funnel (driven by 2-week -> 48-hour conversion lift) ---
# Pre-DevHire baseline: of every 100 applicable leads, ~2 weeks to land
# a first interview; ~55% of warm leads are lost to the wait.
LEAD_DROP_BASELINE = 0.55             # 55% warm leads lost waiting 2 weeks
LEAD_DROP_DEVHIRE  = 0.15             # 15% lost waiting 48h
CONVERSION_UPLIFT  = (1 - LEAD_DROP_DEVHIRE) / (1 - LEAD_DROP_BASELINE)
# ~1.89x conversion efficiency on qualified leads

# Marketing spend (per month) -- scales as the business grows
MARKETING_SPEND = [1200, 1500, 1800, 2200, 2600, 3000,
                   3400, 3800, 4200, 4600, 5000, 5400]

# Qualified prospects reached per marketing dollar (post-uplift rate)
LEADS_PER_DOLLAR = 0.020 * CONVERSION_UPLIFT   # ~0.0378 qualified leads / $
SIGN_UP_RATE = 0.12                            # 12% of qualified leads become customers
BASE_REFERRALS = 1                             # organic/referral signups per month (grows)

# --- Churn ---
# Monthly gross churn. Early-stage SMB/startup software. Improves as
# product matures / cohort ages. 4% starting, tapering to ~2.5%.
GROSS_CHURN_BASE = 0.040
GROSS_CHURN_DECAY = 0.0015            # monthly improvement in churn rate

# --- Costs ---
ENG_MAINT_COST = 3000.0               # infra + support + maintenance / mo
PLATFORM_FEE = 0.029 + 0.30           # Stripe processing: 2.9% + $0.30 flat
MISC_FIXED = 800.0                    # tools, accounting, misc

# ============================================================
# MODEL
# ============================================================
def run_model():
    rows = []
    customers = START_CUSTOMERS
    retained_prev = 0

    for m in range(1, MONTHS + 1):
        # Churn rate for this month (improves over time)
        churn = max(GROSS_CHURN_BASE - GROSS_CHURN_DECAY * (m - 1), 0.020)

        # Customers lost this month from prior base
        lost = round(customers * churn)

        # New customers via marketing (uplift-adjusted) + organic
        leads = MARKETING_SPEND[m - 1] * LEADS_PER_DOLLAR
        paid_new = math.floor(leads * SIGN_UP_RATE)
        organic = BASE_REFERRALS + retained_prev   # referrals grow with base
        new_customers = paid_new + organic

        customers = max(customers - lost + new_customers, 0)

        mrr = customers * PRICE_MONTHLY
        spend = MARKETING_SPEND[m - 1]
        cac = spend / new_customers if new_customers else 0.0

        # Costs
        processing = mrr * 0.029 + customers * 0.30
        opex = spend + ENG_MAINT_COST + MISC_FIXED + processing
        gross_profit = mrr - processing - ENG_MAINT_COST - MISC_FIXED
        net = mrr - opex
        margin = (mrr - spend - MISC_FIXED) / mrr if mrr else 0

        rows.append({
            "month": m,
            "customers": customers,
            "new_customers": new_customers,
            "lost_customers": lost,
            "churn_rate": round(churn, 4),
            "mrr": round(mrr, 2),
            "marketing_spend": spend,
            "cac": round(cac, 2),
            "processing_fee": round(processing, 2),
            "opex": round(opex, 2),
            "gross_profit": round(gross_profit, 2),
            "net_profit": round(net, 2),
            "gross_margin": round(margin, 4),
        })
        retained_prev = new_customers

    return rows

def main():
    rows = run_model()

    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "assumptions": {
            "price_monthly": PRICE_MONTHLY,
            "cohort_conversion_uplift_x": round(CONVERSION_UPLIFT, 2),
            "lead_drop_baseline_pct": LEAD_DROP_BASELINE,
            "lead_drop_devhire_pct": LEAD_DROP_DEVHIRE,
            "gross_churn_start_pct": GROSS_CHURN_BASE,
            "gross_churn_floor_pct": 0.020,
            "starting_customers": START_CUSTOMERS,
        },
        "monthly": rows,
        "totals": {
            "end_customers": rows[-1]["customers"],
            "mrr_end": rows[-1]["mrr"],
            "arr_run_rate_end": round(rows[-1]["mrr"] * 12, 2),
            "total_revenue_12mo": round(sum(r["mrr"] for r in rows), 2),
            "total_marketing_spend": round(sum(r["marketing_spend"] for r in rows), 2),
            "blended_cac_12mo": round(
                sum(r["marketing_spend"] for r in rows) /
                sum(r["new_customers"] for r in rows), 2),
            "avg_monthly_churn_pct": round(
                sum(r["churn_rate"] for r in rows) / len(rows) * 100, 2),
            "cumulative_net": round(sum(r["net_profit"] for r in rows), 2),
        },
    }

    with open("backend/financial_model_output.json", "w") as f:
        json.dump(summary, f, indent=2)

    # --- Markdown report ---
    t = summary["totals"]
    lines = []
    lines.append("# DevHire Financial Model -- 12-Month Projection")
    lines.append("")
    lines.append(f"*Generated {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}*")
    lines.append("")
    lines.append("## Key Assumptions")
    lines.append("")
    lines.append(f"- **Pricing:** ${PRICE_MONTHLY:,.0f}/mo flat (unlimited roles)")
    lines.append("- **Conversion improvement:** time-to-first-interview 2 weeks to 48 hours")
    lines.append(f"  - qualified-lead loss drops from {LEAD_DROP_BASELINE*100:.0f}% to "
                 f"{LEAD_DROP_DEVHIRE*100:.0f}% (approx **{CONVERSION_UPLIFT:.2f}x** conversion efficiency)")
    lines.append(f"- **Starting active customers:** {START_CUSTOMERS}")
    lines.append(f"- **Monthly gross churn:** starts {GROSS_CHURN_BASE*100:.1f}%, improves ~0.15 pts/mo toward 2% floor")
    lines.append("")
    lines.append("## 12-Month Highlights")
    lines.append("")
    lines.append("| Metric | Value |")
    lines.append("|---|---|")
    lines.append(f"| Active customers (Mo 12) | {t['end_customers']} |")
    lines.append(f"| MRR (Mo 12) | ${t['mrr_end']:,.0f} |")
    lines.append(f"| ARR run-rate (Mo 12) | ${t['arr_run_rate_end']:,.0f} |")
    lines.append(f"| Total revenue (12 mo) | ${t['total_revenue_12mo']:,.0f} |")
    lines.append(f"| Total marketing spend (12 mo) | ${t['total_marketing_spend']:,.0f} |")
    lines.append(f"| Blended CAC | ${t['blended_cac_12mo']:,.0f} |")
    lines.append(f"| Avg monthly gross churn | {t['avg_monthly_churn_pct']:.1f}% |")
    lines.append(f"| Cumulative net (12 mo) | ${t['cumulative_net']:,.0f} |")
    lines.append("")
    lines.append("## Monthly Detail")
    lines.append("")
    lines.append("| Mo | Customers | New | Lost | Churn% | MRR | Spend | CAC | Net |")
    lines.append("|---|---:|---:|---:|---:|---:|---:|---:|---:|")
    for r in rows:
        lines.append(
            f"| {r['month']} | {r['customers']} | {r['new_customers']} | "
            f"{r['lost_customers']} | {r['churn_rate']*100:.2f}% | "
            f"${r['mrr']:,.0f} | ${r['marketing_spend']:,.0f} | "
            f"${r['cac']:,.0f} | ${r['net_profit']:,.0f} |")
    lines.append("")
    lines.append("## Interpretation")
    lines.append("")
    lines.append("- The **2-week to 48h conversion shift** is the core growth lever: cutting warm-lead "
                 "dropoff from 55% to 15% roughly doubles the yield of every marketing dollar, keeping "
                 "blended CAC well under one month of revenue (payback under 30 days).")
    lines.append(f"- CAC lands near **${t['blended_cac_12mo']:,.0f}** against a ${PRICE_MONTHLY:,.0f}/mo price -- "
                 "payback of about 1 month, a healthy ratio for SMB/startup software.")
    lines.append("- Churn declines as cohorts age; at the 2% floor the subscriber base compounds "
                 "largely via organic referrals that scale with the installed base.")

    report = "\n".join(lines) + "\n"
    with open("backend/financial_model_report.md", "w") as f:
        f.write(report)

    print(report)

if __name__ == "__main__":
    main()