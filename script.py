import base64
with open('vite_src/src/App.jsx','r',encoding='utf-8') as f:
    s=f.read()
c1=s[:10890]
print(base64.b64encode(c1.encode()).decode())