<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Checkup Report</title>
<style>body{font-family:system-ui;max-width:800px;margin:auto;padding:2em}
.vital{background:#f0fdf4;padding:1em;border-radius:8px;margin:.5em 0}
.low{color:#dc2626}.medium{color:#d97706}.high{color:#16a34a}
table{width:100%;border-collapse:collapse}
td,th{padding:8px;text-align:left;border-bottom:1px solid #e5e7eb}
</style></head>
<body>
<h1>Design Checkup</h1>
<p>Generated: {{DATE}} | Scope: {{TARGET}}</p>
<div class="vital"><strong>Vitals:</strong> A11y {{A11Y}} · Perf {{PERF}} · Layout {{LAYOUT}} · Responsive {{RESP}} · Copy {{COPY}}</div>
<table>
<tr><th>Issue</th><th>Severity</th><th>Location</th><th>Fix</th></tr>
{{ISSUES}}
</table>
</body></html>
