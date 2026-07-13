<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Smell Report</title>
<style>body{font-family:system-ui;max-width:800px;margin:auto;padding:2em}
.smell{background:#fef2f2;padding:1em;border-radius:8px;margin:.5em 0}
.critical{color:#dc2626}.warning{color:#d97706}
table{width:100%;border-collapse:collapse}
td,th{padding:8px;text-align:left;border-bottom:1px solid #e5e7eb}
</style></head>
<body>
<h1>AI Slop Detection</h1>
<p>Generated: {{DATE}} | Scope: {{TARGET}}</p>
<div class="smell"><strong>Found {{COUNT}} smell patterns</strong> — {{CRITICAL}} critical, {{WARNING}} warnings</div>
<table>
<tr><th>Pattern</th><th>Severity</th><th>Location</th><th>Suggested fix</th></tr>
{{SMELLS}}
</table>
</body></html>
