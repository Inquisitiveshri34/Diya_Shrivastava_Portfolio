# Portfolio Website — Design Source
 
Exported 11 Nov 2026 from the Portfolio page of the design canvas (version 52). This is the exact markup of each screen, meant as the reference when building the Next.js + Tailwind site. Pair it with *Portfolio Website — Build Spec* (rules and decisions) and *Portfolio Website — Content* (copy).
 
How to read these files: each screen is HTML with inline styles. `{{name}}` holes are filled from the `renderVals()` function in the script at the bottom of the file. `<sc-for>` repeats a block over a list, and `<sc-if>` shows a block conditionally. All data (project cards, timeline rows, certifications, chart counts) lives in `renderVals()`.
 
## Screens
 
- **Home — laptop (1280px)** — `Main.dc.html`
- **Home — phone (390px)** — `HomePhone.dc.html`
- **Work** — `Work.dc.html`
- **Case study — ClauseCheck** — `CaseStudy.dc.html`
- **About** — `About.dc.html`
- **Style guide** — `StyleGuide.dc.html`
## Home — laptop (1280px) — Main.dc.html
 
```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Home — Diya Shrivastava</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&amp;family=Public+Sans:wght@400;500;600&amp;family=Roboto+Mono:wght@500;600&amp;display=swap">
<style>
body{margin:0}
a{color:#6C3E66;text-decoration:none}
a:hover{color:#5A3355;text-decoration:underline;text-underline-offset:3px}
</style>
</helmet>
<div style="background: #F5F7F2; color: #23262B; font-family: 'Public Sans', system-ui, sans-serif; font-size: 18px; line-height: 1.65; width: 100%; min-height: 100vh">
 
  <header style="position: sticky; top: 0; z-index: 5; background: rgba(245,247,242,0.92); border-bottom: 1px solid #DEE5D8; backdrop-filter: blur(6px)">
    <div style="max-width: 1040px; margin: 0 auto; padding: 14px 32px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap">
      <a href="Main.dc.html" aria-hidden="{{markHidden}}" tabIndex="{{markTab}}" style="display: flex; align-items: center; gap: 10px; color: #23262B; text-decoration: none; opacity: {{markOpacity}}; pointer-events: {{markPE}}; transform: translateY({{markY}}px); transition: opacity 0.25s ease, transform 0.25s ease">
        <span aria-hidden="true" style="width: 34px; height: 34px; box-sizing: border-box; border: 3px double #6C3E66; border-radius: 5px; color: #6C3E66; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 13px; display: flex; align-items: center; justify-content: center; transform: rotate(-3deg)">DS</span>
        <span style="font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 20px; letter-spacing: -0.01em">Diya Shrivastava</span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 28px; font-size: 15.5px">
        <a href="Work.dc.html" style="color: #23262B">Work</a>
        <a href="About.dc.html" style="color: #23262B">About</a>
        <a href="#" style="color: #23262B">Résumé</a>
      </nav>
    </div>
  </header>
 
  <main>
  <section style="padding: 112px 0 80px">
    <div style="max-width: 1040px; margin: 0 auto 32px; padding: 0 32px; display: flex; flex-direction: column; gap: 22px">
      <svg aria-hidden="true" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#6C3E66" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 40c6-.5 9-3 12-7.5s5.5-6 9.5-6.5S33 23 36 17s4.5-8 8-9.5"></path><circle cx="44" cy="7.5" r="2.4" fill="#6C3E66" stroke="none"></circle><path d="M4 44h40" opacity="0.35"></path></svg>
      <h1 ref="{{setHead}}" style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 60px; line-height: 1.1; letter-spacing: -0.015em; width: 778px">I'm Diya Shrivastava.<br>I build machine‑learning systems <span style="background: linear-gradient(transparent 60%, #F3EAF1 60%); padding: 0 2px; -webkit-box-decoration-break: clone; box-decoration-break: clone">people can rely on.</span></h1>
    </div>
    <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 48px">
      <div style="flex: 999 1 560px; min-width: 0; max-width: 680px; display: flex; flex-direction: column; gap: 22px">
        <p style="margin: 0; font-size: 19px; color: #5D626A; max-width: 60ch">Models that know how confident they are, and AI assistants that show their sources — or say "I don't know." I care about work that's useful beyond the demo.</p>
        <p style="margin: 0 0 -8px; font-size: 16px; color: #5D626A"><a href="#certifications" style="font-weight: 500">4× Microsoft Certified</a> · Applied ML &amp; GenAI Developer · Ahmedabad, India</p>
        <p style="margin: 0; align-self: flex-start; display: inline-flex; align-items: center; gap: 9px; background: #F3EAF1; border-radius: 999px; padding: 6px 16px 6px 13px; font-size: 14.5px; font-weight: 500"><span style="width: 7px; height: 7px; border-radius: 50%; background: #6C3E66"></span>Open to AI/ML and Data Science internships — available now.</p>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
          <a href="Work.dc.html" style="display: inline-flex; align-items: center; min-height: 46px; padding: 0 24px; border-radius: 999px; background: #6C3E66; color: #FFFFFF; font-weight: 600; font-size: 15.5px; text-decoration: none">See my work</a>
          <a href="#" style="display: inline-flex; align-items: center; min-height: 46px; padding: 0 24px; border-radius: 999px; border: 1px solid rgba(35,38,43,0.22); color: #23262B; font-weight: 600; font-size: 15.5px; text-decoration: none">Download résumé</a>
        </div>
        <p style="margin: 0; display: flex; gap: 22px; font-size: 15.5px"><a href="#">Email</a><a href="#">GitHub</a><a href="#">LinkedIn</a></p>
      </div>
      <aside style="flex: 1 1 300px; min-width: 0; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 26px">
        <h2 style="margin: 0 0 12px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 21px; line-height: 1.3">What I'm doing these days.</h2>
        <ul style="margin: 0; padding: 0 0 0 18px; display: flex; flex-direction: column; gap: 10px; font-size: 15.5px; color: #23262B">
          <li>Third year of B.Tech CSE at Lovely Professional University, currently studying Design &amp; Analysis of Algorithms and DevOps.</li>
          <li>Practising data structures and algorithms in Java on Codeforces.</li>
        </ul>
        <p style="margin: 14px 0 0; font-size: 13.5px; color: #5D626A">Updated November 2026</p>
      </aside>
    </div>
  </section>
 
  <section style="padding: 80px 0">
    <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px">
      <h2 style="margin: 0 0 32px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 32px; line-height: 1.25; letter-spacing: -0.01em">Latest problems I've worked on.</h2>
      <div style="display: flex; flex-direction: column; gap: 20px">
 
        <a href="CaseStudy.dc.html" style="display: flex; flex-wrap: wrap; gap: 24px 48px; background: #EBF0E7; border-radius: 16px; padding: 32px; color: #23262B; text-decoration: none">
          <div style="flex: 999 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 10px">
            <p style="margin: 0; font-size: 14px; color: #5D626A">Legal &amp; procurement · 2026</p>
            <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 27px; line-height: 1.2">ClauseCheck<span style="display: block; font-family: 'Public Sans', sans-serif; font-weight: 400; font-size: 15px; color: #5D626A; margin-top: 2px">Procurement RAG Assistant</span></h3>
            <p style="margin: 0; font-size: 16.5px">Procurement teams lose hours hunting through supplier contracts. ClauseCheck answers their questions with the exact clause cited — and refuses when the contracts don't say.</p>
            <p style="margin: 0; font-size: 13.5px; color: #5D626A">Python · ChromaDB · BM25 · FastAPI · Streamlit</p>
            <span style="font-size: 15px; font-weight: 600; color: #6C3E66">Read case study →</span>
          </div>
          <div style="flex: 1 1 260px; min-width: 0; align-self: center; display: flex; flex-direction: column; gap: 8px">
            <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 36px; line-height: 1.15; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66; padding-bottom: 1px">93.5%</span> <span style="font-size: 15px; font-weight: 500; color: #23262B">recall@5</span></p>
            <div aria-hidden="true" style="display: flex; flex-wrap: wrap; gap: 4px; max-width: 260px; margin-top: 4px"><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #FFFFFF"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #FFFFFF"></span></div>
            <p style="margin: 0; font-size: 13.5px; color: #5D626A; line-height: 1.45">Gold clause in the top 5 for 29 of 31 questions — one dot per question.</p>
            <p style="margin: 6px 0 0; padding-top: 10px; border-top: 1px solid #D3DBCD; font-size: 14px; color: #5D626A; line-height: 1.45"><span style="font-family: 'Roboto Mono', monospace; color: #23262B">9 of 9 refused</span> — every unanswerable question, with 1 of 31 wrongly refused</p>
          </div>
        </a>
 
        <a href="#" style="display: flex; flex-wrap: wrap; gap: 24px 48px; background: #EBF0E7; border-radius: 16px; padding: 32px; color: #23262B; text-decoration: none">
          <div style="flex: 999 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 10px">
            <p style="margin: 0; font-size: 14px; color: #5D626A">Payments &amp; fintech risk · 2026</p>
            <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 27px; line-height: 1.2">ChargebackLens<span style="display: block; font-family: 'Public Sans', sans-serif; font-weight: 400; font-size: 15px; color: #5D626A; margin-top: 2px">Transaction Dispute Risk &amp; Decision Engine</span></h3>
            <p style="margin: 0; font-size: 16.5px">Payment teams have to decide, transaction by transaction, whether to allow, challenge or review. ChargebackLens turns dispute risk into the rupee-optimal decision.</p>
            <p style="margin: 0; font-size: 13.5px; color: #5D626A">Python · Scikit-learn · Pandas · Streamlit</p>
            <span style="font-size: 15px; font-weight: 600; color: #6C3E66">Read case study →</span>
          </div>
          <div style="flex: 1 1 260px; min-width: 0; align-self: center; display: flex; flex-direction: column; gap: 8px">
            <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 36px; line-height: 1.15; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66; padding-bottom: 1px">16.2×</span> <span style="font-size: 15px; font-weight: 500; color: #23262B">lift</span></p>
            <div aria-hidden="true" style="display: flex; flex-direction: column; gap: 5px; max-width: 260px; margin-top: 4px"><div style="display: flex; align-items: center; gap: 8px"><span style="flex: 1 1 auto; position: relative; height: 8px; border-radius: 999px; background: #FFFFFF; border: 1px solid #D3DBCD; overflow: hidden"><span style="position: absolute; left: 0; top: 0; bottom: 0; width: 97.3%; background: #6C3E66"></span></span><span style="flex: none; width: 64px; font-family: 'Roboto Mono', monospace; font-size: 11.5px; color: #23262B">top 1%</span></div><div style="display: flex; align-items: center; gap: 8px"><span style="flex: 1 1 auto; position: relative; height: 8px; border-radius: 999px; background: #FFFFFF; border: 1px solid #D3DBCD; overflow: hidden"><span style="position: absolute; left: 0; top: 0; bottom: 0; width: 6%; background: #8B9089"></span></span><span style="flex: none; width: 64px; font-family: 'Roboto Mono', monospace; font-size: 11.5px; color: #5D626A">all</span></div></div>
            <p style="margin: 0; font-size: 13.5px; color: #5D626A; line-height: 1.45">Dispute rate in the riskiest 1% (66 of 452) against 0.90% across all transactions.</p>
            <p style="margin: 6px 0 0; padding-top: 10px; border-top: 1px solid #D3DBCD; font-size: 14px; color: #5D626A; line-height: 1.45"><span style="font-family: 'Roboto Mono', monospace; color: #23262B">₹11.99L net savings</span> — 39.1% of exposure</p>
          </div>
        </a>
 
        <a href="#" style="display: flex; flex-wrap: wrap; gap: 24px 48px; background: #EBF0E7; border-radius: 16px; padding: 32px; color: #23262B; text-decoration: none">
          <div style="flex: 999 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 10px">
            <p style="margin: 0; font-size: 14px; color: #5D626A">Product analytics · 2026 · Team project</p>
            <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 27px; line-height: 1.2">StreakForge<span style="display: block; font-family: 'Public Sans', sans-serif; font-weight: 400; font-size: 15px; color: #5D626A; margin-top: 2px">Fitness Engagement &amp; Retention Insight Platform</span></h3>
            <p style="margin: 0; font-size: 16.5px">Fitness apps can see who stops showing up, but not why. StreakForge shows which engagement habits keep members coming back — and finds the biggest leak is members who never get started.</p>
            <p style="margin: 0; font-size: 13.5px; color: #5D626A">Python · Pandas · Plotly · Streamlit</p>
            <span style="font-size: 15px; font-weight: 600; color: #6C3E66">Read case study →</span>
          </div>
          <div style="flex: 1 1 260px; min-width: 0; align-self: center; display: flex; flex-direction: column; gap: 8px">
            <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 36px; line-height: 1.15; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66; padding-bottom: 1px">81.2%</span> <span style="font-size: 15px; font-weight: 500; color: #23262B">drop-off</span></p>
            <div aria-hidden="true" style="position: relative; height: 8px; max-width: 260px; border-radius: 999px; background: #FFFFFF; border: 1px solid #D3DBCD; overflow: hidden; margin-top: 6px"><span style="position: absolute; left: 0; top: 0; bottom: 0; width: 18.8%; background: #6C3E66"></span></div>
            <p style="margin: 0; font-size: 13.5px; color: #5D626A; line-height: 1.45">Only 18.8% of members activate in their first 7 days.</p>
            <p style="margin: 6px 0 0; padding-top: 10px; border-top: 1px solid #D3DBCD; font-size: 14px; color: #5D626A; line-height: 1.45"><span style="font-family: 'Roboto Mono', monospace; color: #23262B">27.9% vs 15.6%</span> — activation on the PT-Combo plan vs Basic</p>
          </div>
        </a>
 
        <a href="#" style="display: flex; flex-wrap: wrap; gap: 24px 48px; background: #EBF0E7; border-radius: 16px; padding: 32px; color: #23262B; text-decoration: none">
          <div style="flex: 999 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 10px">
            <p style="margin: 0; font-size: 14px; color: #5D626A">Logistics · 2026</p>
            <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 27px; line-height: 1.2">DeliverIQ<span style="display: block; font-family: 'Public Sans', sans-serif; font-weight: 400; font-size: 15px; color: #5D626A; margin-top: 2px">Delivery ETA Predictor</span></h3>
            <p style="margin: 0; font-size: 16.5px">Customers and dispatchers need delivery times they can plan around. DeliverIQ predicts urban delivery ETAs from traffic, weather and road data.</p>
            <p style="margin: 0; font-size: 13.5px; color: #5D626A">Python · Scikit-learn · Pandas · Streamlit</p>
            <span style="font-size: 15px; font-weight: 600; color: #6C3E66">Read case study →</span>
          </div>
          <div style="flex: 1 1 260px; min-width: 0; align-self: center; display: flex; flex-direction: column; gap: 8px">
            <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 36px; line-height: 1.15; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66; padding-bottom: 1px">7.83 min</span> <span style="font-size: 15px; font-weight: 500; color: #23262B">MAE</span></p>
            <div aria-hidden="true" style="position: relative; height: 26px; max-width: 260px; margin-top: 4px"><span style="position: absolute; left: 0; right: 0; top: 12px; height: 1px; background: #C9D3C2"></span><span style="position: absolute; left: 0; top: 7px; width: 1px; height: 11px; background: #C9D3C2"></span><span style="position: absolute; right: 0; top: 7px; width: 1px; height: 11px; background: #C9D3C2"></span><span style="position: absolute; left: 39.2%; width: 48.2%; top: 11px; height: 3px; background: #E3D3E0"></span><span style="position: absolute; left: calc(39.2% - 5px); top: 7px; width: 10px; height: 10px; border-radius: 50%; background: #6C3E66"></span><span style="position: absolute; left: calc(87.4% - 5px); top: 7px; width: 10px; height: 10px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #5D626A; background: #EBF0E7"></span></div>
            <p style="margin: 0; font-size: 13.5px; color: #5D626A; line-height: 1.45">Model (filled) against the 17.48-min baseline (open), on a 0–20 min scale.</p>
            <p style="margin: 6px 0 0; padding-top: 10px; border-top: 1px solid #D3DBCD; font-size: 14px; color: #5D626A; line-height: 1.45"><span style="font-family: 'Roboto Mono', monospace; color: #23262B">55% better</span> — than the baseline</p>
          </div>
        </a>
      </div>
      <p style="margin: 28px 0 0; font-size: 16px"><a href="Work.dc.html" style="font-weight: 600">All projects →</a></p>
    </div>
  </section>
 
  <section style="padding: 80px 0; background: #EBF0E7">
    <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px">
      <h2 style="margin: 0 0 36px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 32px; line-height: 1.25; letter-spacing: -0.01em">How I try to work.</h2>
      <div style="max-width: 680px; display: flex; flex-direction: column; gap: 30px">
        <div style="border-left: 2px solid #6C3E66; padding-left: 22px">
          <h3 style="margin: 0 0 4px; font-family: 'Literata', Georgia, serif; font-style: italic; font-weight: 400; font-size: 25px; line-height: 1.35">Honest numbers.</h3>
          <p style="margin: 0; color: #5D626A; font-size: 17px">Every metric shown with its baseline and its limits.</p>
        </div>
        <div style="border-left: 2px solid #6C3E66; padding-left: 22px">
          <h3 style="margin: 0 0 4px; font-family: 'Literata', Georgia, serif; font-style: italic; font-weight: 400; font-size: 25px; line-height: 1.35">Decisions, not just predictions.</h3>
          <p style="margin: 0; color: #5D626A; font-size: 17px">A model is only useful when its output is something someone can act on.</p>
        </div>
        <div style="border-left: 2px solid #6C3E66; padding-left: 22px">
          <h3 style="margin: 0 0 4px; font-family: 'Literata', Georgia, serif; font-style: italic; font-weight: 400; font-size: 25px; line-height: 1.35">Work that lasts beyond the demo.</h3>
          <p style="margin: 0; color: #5D626A; font-size: 17px">Tests, documentation, and saying what's unfinished.</p>
        </div>
      </div>
    </div>
  </section>
 
  <section style="padding: 80px 0">
    <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px">
      <h2 style="margin: 0 0 36px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 32px; line-height: 1.25; letter-spacing: -0.01em">How I approach a problem.</h2>
      <ol style="margin: 0; padding: 0; list-style: none; display: flex; align-items: stretch; gap: 0">
        <li style="flex: 1 1 0; min-width: 0; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 20px">
          <span style="font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 14px; color: #6C3E66">1</span>
          <h3 style="margin: 4px 0 6px; font-size: 18px; font-weight: 600; line-height: 1.35">Understand the decision</h3>
          <p style="margin: 0; font-size: 15.5px; color: #5D626A">Who will act on the output, and what a mistake costs them.</p>
        </li>
        <li aria-hidden="true" style="flex: none; width: 36px; display: flex; align-items: center; justify-content: center; color: #6C3E66; font-size: 18px">→</li>
        <li style="flex: 1 1 0; min-width: 0; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 20px">
          <span style="font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 14px; color: #6C3E66">2</span>
          <h3 style="margin: 4px 0 6px; font-size: 18px; font-weight: 600; line-height: 1.35">Respect the data</h3>
          <p style="margin: 0; font-size: 15.5px; color: #5D626A">Clean it, question it, and split it the way time actually flows.</p>
        </li>
        <li aria-hidden="true" style="flex: none; width: 36px; display: flex; align-items: center; justify-content: center; color: #6C3E66; font-size: 18px">→</li>
        <li style="flex: 1 1 0; min-width: 0; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 20px">
          <span style="font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 14px; color: #6C3E66">3</span>
          <h3 style="margin: 4px 0 6px; font-size: 18px; font-weight: 600; line-height: 1.35">Evaluate honestly</h3>
          <p style="margin: 0; font-size: 15.5px; color: #5D626A">Baselines, calibration, and the cases where it fails.</p>
        </li>
        <li aria-hidden="true" style="flex: none; width: 36px; display: flex; align-items: center; justify-content: center; color: #6C3E66; font-size: 18px">→</li>
        <li style="flex: 1 1 0; min-width: 0; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 20px">
          <span style="font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 14px; color: #6C3E66">4</span>
          <h3 style="margin: 4px 0 6px; font-size: 18px; font-weight: 600; line-height: 1.35">Ship something usable</h3>
          <p style="margin: 0; font-size: 15.5px; color: #5D626A">Tested, documented, and clear about its limits.</p>
        </li>
      </ol>
    </div>
  </section>
 
  <section id="certifications" style="padding: 80px 0; background: #EBF0E7">
    <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px">
      <h2 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 32px; line-height: 1.25; letter-spacing: -0.01em">Major certifications</h2>
      <p style="margin: 10px 0 28px; font-size: 17px; color: #5D626A; max-width: 680px">Microsoft certifications earned alongside my degree in 2026. Each one links to Microsoft's own verification page.</p>
      <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px">
        <sc-for list="{{major}}" as="c" hint-placeholder-count="4">
          <div style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; min-width: 0">
            <a href="#" aria-label="View the {{c.code}} certificate" style="display: block; aspect-ratio: 297 / 210; max-width: 100%; background: #EEF2EA; border-bottom: 1px solid #DEE5D8; padding: 12px; box-sizing: border-box; text-decoration: none">
              <span style="display: flex; height: 100%; box-sizing: border-box; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 3px; box-shadow: 0 1px 3px rgba(35,38,43,0.06); flex-direction: column; align-items: center; justify-content: center; gap: 3px; text-align: center; padding: 8px">
                <span style="font-family: 'Roboto Mono', monospace; font-size: 12px; color: #23262B">{{c.file}}</span>
                <span style="font-size: 11.5px; color: #5D626A">landscape certificate</span>
              </span>
            </a>
            <div style="padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 9px; flex: 1 1 auto">
              <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 20px; line-height: 1.3; text-wrap: balance">{{c.name}}</h3>
              <p style="margin: 0; font-size: 13.5px; color: #5D626A">Microsoft · <span style="font-family: 'Roboto Mono', monospace">{{c.code}}</span> · <span style="font-family: 'Roboto Mono', monospace">{{c.date}}</span></p>
              <p style="margin: auto 0 0; padding-top: 8px; display: flex; flex-wrap: wrap; gap: 4px 16px; font-size: 14px; font-weight: 600"><a href="#">View certificate</a><a href="#">Verify →</a></p>
            </div>
          </div>
        </sc-for>
      </div>
 
      <h2 style="margin: 64px 0 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 26px; line-height: 1.25">More certifications</h2>
      <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px">
        <sc-for list="{{more}}" as="c" hint-placeholder-count="3">
          <div style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; min-width: 0">
            <a href="#" aria-label="View the {{c.name}} certificate" style="display: block; aspect-ratio: 297 / 210; max-width: 100%; background: #EEF2EA; border-bottom: 1px solid #DEE5D8; padding: 14px; box-sizing: border-box; text-decoration: none">
              <span style="display: flex; height: 100%; box-sizing: border-box; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 3px; box-shadow: 0 1px 3px rgba(35,38,43,0.06); flex-direction: column; align-items: center; justify-content: center; gap: 3px; text-align: center; padding: 8px">
                <span style="font-family: 'Roboto Mono', monospace; font-size: 12px; color: #23262B">{{c.file}}</span>
                <span style="font-size: 11.5px; color: #5D626A">landscape certificate</span>
              </span>
            </a>
            <div style="padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto">
              <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 17px; line-height: 1.3">{{c.name}}</h3>
              <p style="margin: 0; font-size: 13.5px; color: #5D626A">{{c.by}} · <span style="font-family: 'Roboto Mono', monospace">{{c.date}}</span></p>
              <p style="margin: auto 0 0; padding-top: 8px; display: flex; flex-wrap: wrap; gap: 4px 16px; font-size: 14px; font-weight: 600"><a href="#">View certificate</a><a href="#">Verify →</a></p>
            </div>
          </div>
        </sc-for>
      </div>
    </div>
  </section>
 
  <section style="padding: 80px 0">
    <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px">
      <h2 style="margin: 0 0 28px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 32px; line-height: 1.25; letter-spacing: -0.01em">Toolkit</h2>
      <div style="border-bottom: 1px solid #DEE5D8">
        <div style="display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 16px; padding: 14px 0; border-top: 1px solid #DEE5D8"><p style="margin: 0; font-weight: 600; font-size: 16px">Core</p><p style="margin: 0; font-size: 16px">Python, Java, SQL</p></div>
        <div style="display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 16px; padding: 14px 0; border-top: 1px solid #DEE5D8"><p style="margin: 0; font-weight: 600; font-size: 16px">Machine learning</p><p style="margin: 0; font-size: 16px">Scikit-learn, feature engineering, model calibration, NLP</p></div>
        <div style="display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 16px; padding: 14px 0; border-top: 1px solid #DEE5D8"><p style="margin: 0; font-weight: 600; font-size: 16px">GenAI</p><p style="margin: 0; font-size: 16px">RAG, embeddings, hybrid retrieval (BM25 + RRF), cross-encoder re-ranking, LLM evaluation</p></div>
        <div style="display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 16px; padding: 14px 0; border-top: 1px solid #DEE5D8"><p style="margin: 0; font-weight: 600; font-size: 16px">Data</p><p style="margin: 0; font-size: 16px">NumPy, Pandas, Plotly, Matplotlib, Seaborn, Tableau, Excel, Streamlit</p></div>
        <div style="display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 16px; padding: 14px 0; border-top: 1px solid #DEE5D8"><p style="margin: 0; font-weight: 600; font-size: 16px">Engineering</p><p style="margin: 0; font-size: 16px">Git, GitHub Actions, pytest, Docker, FastAPI, Azure, Databricks</p></div>
      </div>
    </div>
  </section>
 
  <section style="padding: 96px 0; background: #EBF0E7">
    <div style="max-width: 680px; margin: 0 auto; padding: 0 32px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 18px">
      <span aria-hidden="true" style="width: 54px; height: 54px; box-sizing: border-box; border: 3px double #6C3E66; border-radius: 7px; color: #6C3E66; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 19px; display: flex; align-items: center; justify-content: center; transform: rotate(-3deg)">DS</span>
      <h2 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 34px; line-height: 1.25; letter-spacing: -0.01em">Let's build something useful.</h2>
      <p style="margin: 0; font-size: 18px; color: #5D626A">I'm looking for a place where I can learn fast and contribute to problems that matter. If that sounds like your team, I'd love to hear from you.</p>
      <div style="display: flex; flex-wrap: wrap; gap: 22px; align-items: center; justify-content: center; margin-top: 6px">
        <a href="#" style="display: inline-flex; align-items: center; min-height: 46px; padding: 0 26px; border-radius: 999px; background: #6C3E66; color: #FFFFFF; font-weight: 600; font-size: 15.5px; text-decoration: none">Email me</a>
        <a href="#" style="font-size: 15.5px">GitHub</a>
        <a href="#" style="font-size: 15.5px">LinkedIn</a>
      </div>
    </div>
  </section>
  </main>
 
  <footer style="border-top: 1px solid #DEE5D8; padding: 44px 0 52px">
    <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px; font-size: 15px">
      <div style="display: flex; flex-direction: column; gap: 6px">
        <p style="margin: 0; font-family: 'Literata', Georgia, serif; font-size: 17px">Built with care by Diya Shrivastava.</p>
        <p style="margin: 0; font-size: 13.5px; color: #5D626A">Last updated: November 2026</p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px">
        <p style="margin: 0 0 4px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #5D626A">Contact</p>
        <a href="#">Email</a><a href="#">GitHub</a><a href="#">LinkedIn</a>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px">
        <p style="margin: 0 0 4px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #5D626A">Pages</p>
        <a href="Work.dc.html">Work</a><a href="About.dc.html">About</a><a href="#">Résumé</a>
      </div>
    </div>
  </footer>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1280,"height":6000}}'>
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { showMark: false };
    this.setHead = (el) => { this.head = el; };
  }
  componentDidMount() { this.watchHeading(); }
  componentDidUpdate() { if (!this.io) this.watchHeading(); }
  componentWillUnmount() { if (this.io) this.io.disconnect(); }
  watchHeading() {
    if (!this.head || typeof IntersectionObserver === 'undefined') return;
    this.io = new IntersectionObserver((entries) => {
      const e = entries[0];
      const show = !e.isIntersecting && e.boundingClientRect.top < 0;
      if (show !== this.state.showMark) this.setState({ showMark: show });
    }, { threshold: 0 });
    this.io.observe(this.head);
  }
  renderVals() {
    const show = this.state.showMark;
    return {
      setHead: this.setHead,
      markOpacity: show ? 1 : 0, markPE: show ? 'auto' : 'none', markY: show ? 0 : -4,
      markHidden: show ? 'false' : 'true', markTab: show ? 0 : -1,
      major: [
        { code: 'PL-200', name: 'Power Platform Functional Consultant Associate', date: 'Aug 2026', file: 'pl-200.pdf' },
        { code: 'PL-900', name: 'Power Platform Fundamentals', date: 'Aug 2026', file: 'pl-900.pdf' },
        { code: 'AI-900', name: 'Azure AI Fundamentals', date: 'Feb 2026', file: 'ai-900.pdf' },
        { code: 'GH-900', name: 'GitHub Foundations', date: 'Feb 2026', file: 'gh-900.pdf' }
      ],
      more: [
        { name: 'Databricks Fundamentals (Accredited)', by: 'Databricks', date: 'Sep 2026', file: 'databricks-fundamentals.pdf' },
        { name: 'AI Fluency', by: 'Anthropic Academy', date: 'Mar 2026', file: 'ai-fluency.pdf' },
        { name: 'Claude 101', by: 'Anthropic Academy', date: 'Mar 2026', file: 'claude-101.pdf' }
      ]
    };
  }
}
</script>
</body>
</html>
```
 
## Home — phone (390px) — HomePhone.dc.html
 
```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Home on a phone — Diya Shrivastava</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&amp;family=Public+Sans:wght@400;500;600&amp;family=Roboto+Mono:wght@500;600&amp;display=swap">
<style>
body{margin:0}
a{color:#6C3E66;text-decoration:none}
a:hover{color:#5A3355;text-decoration:underline;text-underline-offset:3px}
</style>
</helmet>
<div style="width: 390px; box-sizing: border-box; background: #F5F7F2; color: #23262B; font-family: 'Public Sans', system-ui, sans-serif; font-size: 17px; line-height: 1.65">
 
  <header style="position: sticky; top: 0; z-index: 5; background: rgba(245,247,242,0.94); border-bottom: 1px solid #DEE5D8">
    <div style="padding: 10px 20px; display: flex; align-items: center; justify-content: space-between">
      <a href="HomePhone.dc.html" aria-hidden="{{markHidden}}" tabIndex="{{markTab}}" style="display: flex; align-items: center; gap: 9px; color: #23262B; text-decoration: none; opacity: {{markOpacity}}; pointer-events: {{markPE}}; transform: translateY({{markY}}px); transition: opacity 0.25s ease, transform 0.25s ease">
        <span aria-hidden="true" style="width: 32px; height: 32px; box-sizing: border-box; border: 3px double #6C3E66; border-radius: 5px; color: #6C3E66; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 12px; display: flex; align-items: center; justify-content: center; transform: rotate(-3deg)">DS</span>
        <span style="font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 18px">Diya Shrivastava</span>
      </a>
      <button type="button" aria-label="Open menu" style="min-width: 44px; min-height: 44px; border: 0; background: none; color: #23262B; display: flex; align-items: center; justify-content: center; cursor: pointer">
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#23262B" stroke-width="1.6" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>
      </button>
    </div>
  </header>
 
  <section style="padding: 48px 20px 56px; display: flex; flex-direction: column; gap: 18px">
    <svg aria-hidden="true" width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#6C3E66" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 40c6-.5 9-3 12-7.5s5.5-6 9.5-6.5S33 23 36 17s4.5-8 8-9.5"></path><circle cx="44" cy="7.5" r="2.4" fill="#6C3E66" stroke="none"></circle><path d="M4 44h40" opacity="0.35"></path></svg>
    <h1 ref="{{setHead}}" style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 31px; line-height: 1.18; letter-spacing: -0.02em"><span style="white-space: nowrap">I'm Diya Shrivastava.</span><br><span style="font-size: 26px; line-height: 1.25"><span style="white-space: nowrap">I build machine‑learning</span> systems <span style="background: linear-gradient(transparent 60%, #F3EAF1 60%); padding: 0 2px; -webkit-box-decoration-break: clone; box-decoration-break: clone">people can rely on.</span></span></h1>
    <p style="margin: 0; font-size: 17px; color: #5D626A">Models that know how confident they are, and AI assistants that show their sources — or say "I don't know." I care about work that's useful beyond the demo.</p>
    <p style="margin: 0 0 -6px; font-size: 14.5px; color: #5D626A; line-height: 1.5"><a href="#certifications" style="font-weight: 500">4× Microsoft Certified</a> · Ahmedabad, India<br>Applied ML &amp; GenAI Developer</p>
    <p style="margin: 0; align-self: flex-start; display: inline-flex; align-items: center; gap: 8px; background: #F3EAF1; border-radius: 999px; padding: 6px 14px 6px 12px; font-size: 13.5px; font-weight: 500; line-height: 1.4"><span style="flex: none; width: 7px; height: 7px; border-radius: 50%; background: #6C3E66"></span>Open to AI/ML and Data Science internships — available now.</p>
    <div style="display: flex; flex-wrap: wrap; gap: 10px">
      <a href="#" style="display: inline-flex; align-items: center; min-height: 46px; padding: 0 22px; border-radius: 999px; background: #6C3E66; color: #FFFFFF; font-weight: 600; font-size: 15px; text-decoration: none">See my work</a>
      <a href="#" style="display: inline-flex; align-items: center; min-height: 46px; padding: 0 22px; border-radius: 999px; border: 1px solid rgba(35,38,43,0.22); color: #23262B; font-weight: 600; font-size: 15px; text-decoration: none">Download résumé</a>
    </div>
    <p style="margin: 0; display: flex; gap: 20px; font-size: 15px"><a href="#">Email</a><a href="#">GitHub</a><a href="#">LinkedIn</a></p>
  </section>
 
  <section style="padding: 56px 20px">
    <h2 style="margin: 0 0 24px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 26px; line-height: 1.25">Latest problems I've worked on.</h2>
    <div style="display: flex; flex-direction: column; gap: 16px">
      <a href="#" style="display: flex; flex-direction: column; gap: 9px; background: #EBF0E7; border-radius: 16px; padding: 22px; color: #23262B; text-decoration: none">
        <p style="margin: 0; font-size: 13px; color: #5D626A">Legal &amp; procurement · 2026</p>
        <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 23px; line-height: 1.2">ClauseCheck<span style="display: block; font-family: 'Public Sans', sans-serif; font-weight: 400; font-size: 14px; color: #5D626A; margin-top: 2px">Procurement RAG Assistant</span></h3>
        <p style="margin: 0; font-size: 15.5px">Procurement teams lose hours hunting through supplier contracts. ClauseCheck answers their questions with the exact clause cited — and refuses when the contracts don't say.</p>
        <p style="margin: 6px 0 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 32px; line-height: 1.15; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66; padding-bottom: 1px">93.5%</span> <span style="font-size: 14px; font-weight: 500; color: #23262B">recall@5</span></p>
        <div aria-hidden="true" style="display: flex; flex-wrap: wrap; gap: 4px; max-width: 300px; margin-top: 4px"><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #6C3E66"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #FFFFFF"></span><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: #FFFFFF"></span></div>
        <p style="margin: 0; font-size: 13.5px; color: #5D626A; line-height: 1.45">Gold clause in the top 5 for 29 of 31 questions — one dot per question.</p>
        <p style="margin: 0; padding-top: 10px; border-top: 1px solid #DEE5D8; font-size: 13.5px; color: #5D626A; line-height: 1.45"><span style="font-family: 'Roboto Mono', monospace; color: #23262B">9 of 9 refused</span> — every unanswerable question, with 1 of 31 wrongly refused</p>
        <p style="margin: 0; font-size: 13px; color: #5D626A">Python · ChromaDB · BM25 · FastAPI · Streamlit</p>
        <span style="font-size: 14.5px; font-weight: 600; color: #6C3E66">Read case study →</span>
      </a>
      <a href="#" style="display: flex; flex-direction: column; gap: 9px; background: #EBF0E7; border-radius: 16px; padding: 22px; color: #23262B; text-decoration: none">
        <p style="margin: 0; font-size: 13px; color: #5D626A">Payments &amp; fintech risk · 2026</p>
        <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 23px; line-height: 1.2">ChargebackLens<span style="display: block; font-family: 'Public Sans', sans-serif; font-weight: 400; font-size: 14px; color: #5D626A; margin-top: 2px">Transaction Dispute Risk &amp; Decision Engine</span></h3>
        <p style="margin: 0; font-size: 15.5px">Payment teams have to decide, transaction by transaction, whether to allow, challenge or review. ChargebackLens turns dispute risk into the rupee-optimal decision.</p>
        <p style="margin: 6px 0 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 32px; line-height: 1.15; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66; padding-bottom: 1px">16.2×</span> <span style="font-size: 14px; font-weight: 500; color: #23262B">lift</span></p>
        <div aria-hidden="true" style="display: flex; flex-direction: column; gap: 5px; max-width: 300px; margin-top: 4px"><div style="display: flex; align-items: center; gap: 8px"><span style="flex: 1 1 auto; position: relative; height: 8px; border-radius: 999px; background: #FFFFFF; border: 1px solid #D3DBCD; overflow: hidden"><span style="position: absolute; left: 0; top: 0; bottom: 0; width: 97.3%; background: #6C3E66"></span></span><span style="flex: none; width: 64px; font-family: 'Roboto Mono', monospace; font-size: 11.5px; color: #23262B">top 1%</span></div><div style="display: flex; align-items: center; gap: 8px"><span style="flex: 1 1 auto; position: relative; height: 8px; border-radius: 999px; background: #FFFFFF; border: 1px solid #D3DBCD; overflow: hidden"><span style="position: absolute; left: 0; top: 0; bottom: 0; width: 6%; background: #8B9089"></span></span><span style="flex: none; width: 64px; font-family: 'Roboto Mono', monospace; font-size: 11.5px; color: #5D626A">all</span></div></div>
        <p style="margin: 0; font-size: 13.5px; color: #5D626A; line-height: 1.45">Dispute rate in the riskiest 1% (66 of 452) against 0.90% across all transactions.</p>
        <p style="margin: 0; padding-top: 10px; border-top: 1px solid #DEE5D8; font-size: 13.5px; color: #5D626A; line-height: 1.45"><span style="font-family: 'Roboto Mono', monospace; color: #23262B">₹11.99L net savings</span> — 39.1% of exposure</p>
        <p style="margin: 0; font-size: 13px; color: #5D626A">Python · Scikit-learn · Pandas · Streamlit</p>
        <span style="font-size: 14.5px; font-weight: 600; color: #6C3E66">Read case study →</span>
      </a>
      <a href="#" style="display: flex; flex-direction: column; gap: 9px; background: #EBF0E7; border-radius: 16px; padding: 22px; color: #23262B; text-decoration: none">
        <p style="margin: 0; font-size: 13px; color: #5D626A">Product analytics · 2026 · Team project</p>
        <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 23px; line-height: 1.2">StreakForge<span style="display: block; font-family: 'Public Sans', sans-serif; font-weight: 400; font-size: 14px; color: #5D626A; margin-top: 2px">Fitness Engagement &amp; Retention Insight Platform</span></h3>
        <p style="margin: 0; font-size: 15.5px">Fitness apps can see who stops showing up, but not why. StreakForge shows which engagement habits keep members coming back — and finds the biggest leak is members who never get started.</p>
        <p style="margin: 6px 0 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 32px; line-height: 1.15; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66; padding-bottom: 1px">81.2%</span> <span style="font-size: 14px; font-weight: 500; color: #23262B">drop-off</span></p>
        <div aria-hidden="true" style="position: relative; height: 8px; max-width: 300px; border-radius: 999px; background: #FFFFFF; border: 1px solid #D3DBCD; overflow: hidden; margin-top: 6px"><span style="position: absolute; left: 0; top: 0; bottom: 0; width: 18.8%; background: #6C3E66"></span></div>
        <p style="margin: 0; font-size: 13.5px; color: #5D626A; line-height: 1.45">Only 18.8% of members activate in their first 7 days.</p>
        <p style="margin: 0; padding-top: 10px; border-top: 1px solid #DEE5D8; font-size: 13.5px; color: #5D626A; line-height: 1.45"><span style="font-family: 'Roboto Mono', monospace; color: #23262B">27.9% vs 15.6%</span> — activation on the PT-Combo plan vs Basic</p>
        <p style="margin: 0; font-size: 13px; color: #5D626A">Python · Pandas · Plotly · Streamlit</p>
        <span style="font-size: 14.5px; font-weight: 600; color: #6C3E66">Read case study →</span>
      </a>
      <a href="#" style="display: flex; flex-direction: column; gap: 9px; background: #EBF0E7; border-radius: 16px; padding: 22px; color: #23262B; text-decoration: none">
        <p style="margin: 0; font-size: 13px; color: #5D626A">Logistics · 2026</p>
        <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 23px; line-height: 1.2">DeliverIQ<span style="display: block; font-family: 'Public Sans', sans-serif; font-weight: 400; font-size: 14px; color: #5D626A; margin-top: 2px">Delivery ETA Predictor</span></h3>
        <p style="margin: 0; font-size: 15.5px">Customers and dispatchers need delivery times they can plan around. DeliverIQ predicts urban delivery ETAs from traffic, weather and road data.</p>
        <p style="margin: 6px 0 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 32px; line-height: 1.15; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66; padding-bottom: 1px">7.83 min</span> <span style="font-size: 14px; font-weight: 500; color: #23262B">MAE</span></p>
        <div aria-hidden="true" style="position: relative; height: 26px; max-width: 300px; margin-top: 4px"><span style="position: absolute; left: 0; right: 0; top: 12px; height: 1px; background: #C9D3C2"></span><span style="position: absolute; left: 0; top: 7px; width: 1px; height: 11px; background: #C9D3C2"></span><span style="position: absolute; right: 0; top: 7px; width: 1px; height: 11px; background: #C9D3C2"></span><span style="position: absolute; left: 39.2%; width: 48.2%; top: 11px; height: 3px; background: #E3D3E0"></span><span style="position: absolute; left: calc(39.2% - 5px); top: 7px; width: 10px; height: 10px; border-radius: 50%; background: #6C3E66"></span><span style="position: absolute; left: calc(87.4% - 5px); top: 7px; width: 10px; height: 10px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #5D626A; background: #EBF0E7"></span></div>
        <p style="margin: 0; font-size: 13.5px; color: #5D626A; line-height: 1.45">Model (filled) against the 17.48-min baseline (open), on a 0–20 min scale.</p>
        <p style="margin: 0; padding-top: 10px; border-top: 1px solid #DEE5D8; font-size: 13.5px; color: #5D626A; line-height: 1.45"><span style="font-family: 'Roboto Mono', monospace; color: #23262B">55% better</span> — than the baseline</p>
        <p style="margin: 0; font-size: 13px; color: #5D626A">Python · Scikit-learn · Pandas · Streamlit</p>
        <span style="font-size: 14.5px; font-weight: 600; color: #6C3E66">Read case study →</span>
      </a>
    </div>
    <p style="margin: 22px 0 0; font-size: 15.5px"><a href="#" style="font-weight: 600">All projects →</a></p>
  </section>
 
  <section style="padding: 56px 20px; background: #EBF0E7">
    <h2 style="margin: 0 0 26px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 26px; line-height: 1.25">How I try to work.</h2>
    <div style="display: flex; flex-direction: column; gap: 24px">
      <div style="border-left: 2px solid #6C3E66; padding-left: 18px"><h3 style="margin: 0 0 4px; font-family: 'Literata', Georgia, serif; font-style: italic; font-weight: 400; font-size: 22px; line-height: 1.35">Honest numbers.</h3><p style="margin: 0; color: #5D626A; font-size: 16px">Every metric shown with its baseline and its limits.</p></div>
      <div style="border-left: 2px solid #6C3E66; padding-left: 18px"><h3 style="margin: 0 0 4px; font-family: 'Literata', Georgia, serif; font-style: italic; font-weight: 400; font-size: 22px; line-height: 1.35">Decisions, not just predictions.</h3><p style="margin: 0; color: #5D626A; font-size: 16px">A model is only useful when its output is something someone can act on.</p></div>
      <div style="border-left: 2px solid #6C3E66; padding-left: 18px"><h3 style="margin: 0 0 4px; font-family: 'Literata', Georgia, serif; font-style: italic; font-weight: 400; font-size: 22px; line-height: 1.35">Work that lasts beyond the demo.</h3><p style="margin: 0; color: #5D626A; font-size: 16px">Tests, documentation, and saying what's unfinished.</p></div>
    </div>
  </section>
 
  <section style="padding: 56px 20px">
    <h2 style="margin: 0 0 26px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 26px; line-height: 1.25">How I approach a problem.</h2>
    <ol style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column">
      <li style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 18px"><span style="font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 13px; color: #6C3E66">1</span><h3 style="margin: 2px 0 4px; font-size: 17px; font-weight: 600">Understand the decision</h3><p style="margin: 0; font-size: 15px; color: #5D626A">Who will act on the output, and what a mistake costs them.</p></li>
      <li aria-hidden="true" style="height: 34px; display: flex; align-items: center; justify-content: center; color: #6C3E66">↓</li>
      <li style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 18px"><span style="font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 13px; color: #6C3E66">2</span><h3 style="margin: 2px 0 4px; font-size: 17px; font-weight: 600">Respect the data</h3><p style="margin: 0; font-size: 15px; color: #5D626A">Clean it, question it, and split it the way time actually flows.</p></li>
      <li aria-hidden="true" style="height: 34px; display: flex; align-items: center; justify-content: center; color: #6C3E66">↓</li>
      <li style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 18px"><span style="font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 13px; color: #6C3E66">3</span><h3 style="margin: 2px 0 4px; font-size: 17px; font-weight: 600">Evaluate honestly</h3><p style="margin: 0; font-size: 15px; color: #5D626A">Baselines, calibration, and the cases where it fails.</p></li>
      <li aria-hidden="true" style="height: 34px; display: flex; align-items: center; justify-content: center; color: #6C3E66">↓</li>
      <li style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 18px"><span style="font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 13px; color: #6C3E66">4</span><h3 style="margin: 2px 0 4px; font-size: 17px; font-weight: 600">Ship something usable</h3><p style="margin: 0; font-size: 15px; color: #5D626A">Tested, documented, and clear about its limits.</p></li>
    </ol>
  </section>
 
  <section style="padding: 56px 20px; background: #EBF0E7">
    <h2 style="margin: 0 0 18px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 26px; line-height: 1.25">What I'm doing these days.</h2>
    <ul style="margin: 0; padding: 0 0 0 18px; display: flex; flex-direction: column; gap: 10px; font-size: 16px">
      <li>Third year of B.Tech CSE at Lovely Professional University, currently studying Design &amp; Analysis of Algorithms and DevOps.</li>
      <li>Practising data structures and algorithms in Java on Codeforces.</li>
    </ul>
    <p style="margin: 14px 0 0; font-size: 13.5px; color: #5D626A">Updated November 2026</p>
  </section>
 
  <section style="padding: 56px 20px">
    <h2 style="margin: 0 0 20px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 26px; line-height: 1.25">Toolkit</h2>
    <div style="border-bottom: 1px solid #DEE5D8; font-size: 15px">
      <div style="display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 12px; padding: 12px 0; border-top: 1px solid #DEE5D8"><p style="margin: 0; font-weight: 600">Core</p><p style="margin: 0">Python, Java, SQL</p></div>
      <div style="display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 12px; padding: 12px 0; border-top: 1px solid #DEE5D8"><p style="margin: 0; font-weight: 600">Machine learning</p><p style="margin: 0">Scikit-learn, feature engineering, model calibration, NLP</p></div>
      <div style="display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 12px; padding: 12px 0; border-top: 1px solid #DEE5D8"><p style="margin: 0; font-weight: 600">GenAI</p><p style="margin: 0">RAG, embeddings, hybrid retrieval (BM25 + RRF), cross-encoder re-ranking, LLM evaluation</p></div>
      <div style="display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 12px; padding: 12px 0; border-top: 1px solid #DEE5D8"><p style="margin: 0; font-weight: 600">Data</p><p style="margin: 0">NumPy, Pandas, Plotly, Matplotlib, Seaborn, Tableau, Excel, Streamlit</p></div>
      <div style="display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 12px; padding: 12px 0; border-top: 1px solid #DEE5D8"><p style="margin: 0; font-weight: 600">Engineering</p><p style="margin: 0">Git, GitHub Actions, pytest, Docker, FastAPI, Azure, Databricks</p></div>
    </div>
  </section>
 
  <section id="certifications" style="padding: 56px 20px; background: #EBF0E7">
    <h2 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 26px; line-height: 1.25">Major certifications</h2>
    <p style="margin: 8px 0 20px; font-size: 15.5px; color: #5D626A">Microsoft certifications earned alongside my degree in 2026. Each one links to Microsoft's own verification page.</p>
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
      <sc-for list="{{major}}" as="c" hint-placeholder-count="4">
        <div style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; min-width: 0">
          <a href="#" aria-label="View the {{c.code}} certificate" style="display: block; aspect-ratio: 297 / 210; max-width: 100%; background: #EEF2EA; border-bottom: 1px solid #DEE5D8; padding: 8px; box-sizing: border-box; text-decoration: none">
            <span style="display: flex; height: 100%; box-sizing: border-box; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 2px; align-items: center; justify-content: center; text-align: center; padding: 4px; font-family: 'Roboto Mono', monospace; font-size: 10.5px; color: #5D626A">{{c.file}}</span>
          </a>
          <div style="padding: 12px 14px 14px; display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto">
            <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 16px; line-height: 1.3">{{c.name}}</h3>
            <p style="margin: 0; font-size: 12px; color: #5D626A; line-height: 1.4">Microsoft · <span style="font-family: 'Roboto Mono', monospace">{{c.code}}</span><br><span style="font-family: 'Roboto Mono', monospace">{{c.date}}</span></p>
            <p style="margin: auto 0 0; padding-top: 4px; display: flex; flex-direction: column; gap: 2px; font-size: 13.5px; font-weight: 600"><a href="#">View certificate</a><a href="#">Verify →</a></p>
          </div>
        </div>
      </sc-for>
    </div>
 
    <h2 style="margin: 44px 0 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 22px; line-height: 1.25">More certifications</h2>
    <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 10px">
      <sc-for list="{{more}}" as="c" hint-placeholder-count="3">
        <div style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; overflow: hidden; display: flex; gap: 0; align-items: stretch">
          <a href="#" aria-label="View the {{c.name}} certificate" style="flex: none; width: 128px; aspect-ratio: 297 / 210; align-self: center; background: #EEF2EA; border-right: 1px solid #DEE5D8; padding: 7px; box-sizing: border-box; text-decoration: none">
            <span style="display: flex; height: 100%; box-sizing: border-box; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 2px; align-items: center; justify-content: center; text-align: center; padding: 3px; font-family: 'Roboto Mono', monospace; font-size: 9.5px; color: #5D626A; word-break: break-all">{{c.file}}</span>
          </a>
          <div style="flex: 1 1 auto; min-width: 0; padding: 12px 14px; display: flex; flex-direction: column; gap: 3px">
            <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 15px; line-height: 1.3">{{c.name}}</h3>
            <p style="margin: 0; font-size: 12.5px; color: #5D626A">{{c.by}} · <span style="font-family: 'Roboto Mono', monospace">{{c.date}}</span></p>
            <p style="margin: 4px 0 0; display: flex; flex-wrap: wrap; gap: 2px 14px; font-size: 13.5px; font-weight: 600"><a href="#">View certificate</a><a href="#">Verify →</a></p>
          </div>
        </div>
      </sc-for>
    </div>
  </section>
 
  <section style="padding: 64px 20px; background: #EBF0E7; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px">
    <span aria-hidden="true" style="width: 46px; height: 46px; box-sizing: border-box; border: 3px double #6C3E66; border-radius: 7px; color: #6C3E66; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 16px; display: flex; align-items: center; justify-content: center; transform: rotate(-3deg)">DS</span>
    <h2 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 28px; line-height: 1.25">Let's build something useful.</h2>
    <p style="margin: 0; font-size: 16.5px; color: #5D626A">I'm looking for a place where I can learn fast and contribute to problems that matter. If that sounds like your team, I'd love to hear from you.</p>
    <a href="#" style="display: inline-flex; align-items: center; min-height: 46px; padding: 0 26px; border-radius: 999px; background: #6C3E66; color: #FFFFFF; font-weight: 600; font-size: 15px; text-decoration: none">Email me</a>
    <p style="margin: 0; display: flex; gap: 22px; font-size: 15px"><a href="#">GitHub</a><a href="#">LinkedIn</a></p>
  </section>
 
  <footer style="border-top: 1px solid #DEE5D8; padding: 36px 20px 44px; display: flex; flex-direction: column; gap: 24px; font-size: 15px">
    <div><p style="margin: 0; font-family: 'Literata', Georgia, serif; font-size: 16.5px">Built with care by Diya Shrivastava.</p><p style="margin: 4px 0 0; font-size: 13px; color: #5D626A">Last updated: November 2026</p></div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px">
      <div style="display: flex; flex-direction: column; gap: 4px"><p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #5D626A">Contact</p><a href="#">Email</a><a href="#">GitHub</a><a href="#">LinkedIn</a></div>
      <div style="display: flex; flex-direction: column; gap: 4px"><p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #5D626A">Pages</p><a href="#">Work</a><a href="#">About</a><a href="#">Résumé</a></div>
    </div>
  </footer>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":390,"height":9100}}'>
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { showMark: false };
    this.setHead = (el) => { this.head = el; };
  }
  componentDidMount() { this.watchHeading(); }
  componentDidUpdate() { if (!this.io) this.watchHeading(); }
  componentWillUnmount() { if (this.io) this.io.disconnect(); }
  watchHeading() {
    if (!this.head || typeof IntersectionObserver === 'undefined') return;
    this.io = new IntersectionObserver((entries) => {
      const e = entries[0];
      const show = !e.isIntersecting && e.boundingClientRect.top < 0;
      if (show !== this.state.showMark) this.setState({ showMark: show });
    }, { threshold: 0 });
    this.io.observe(this.head);
  }
  renderVals() {
    const show = this.state.showMark;
    return {
      setHead: this.setHead,
      markOpacity: show ? 1 : 0, markPE: show ? 'auto' : 'none', markY: show ? 0 : -4,
      markHidden: show ? 'false' : 'true', markTab: show ? 0 : -1,
      major: [
        { code: 'PL-200', name: 'Power Platform Functional Consultant Associate', date: 'Aug 2026', file: 'pl-200.pdf' },
        { code: 'PL-900', name: 'Power Platform Fundamentals', date: 'Aug 2026', file: 'pl-900.pdf' },
        { code: 'AI-900', name: 'Azure AI Fundamentals', date: 'Feb 2026', file: 'ai-900.pdf' },
        { code: 'GH-900', name: 'GitHub Foundations', date: 'Feb 2026', file: 'gh-900.pdf' }
      ],
      more: [
        { name: 'Databricks Fundamentals (Accredited)', by: 'Databricks', date: 'Sep 2026', file: 'databricks-fundamentals.pdf' },
        { name: 'AI Fluency', by: 'Anthropic Academy', date: 'Mar 2026', file: 'ai-fluency.pdf' },
        { name: 'Claude 101', by: 'Anthropic Academy', date: 'Mar 2026', file: 'claude-101.pdf' }
      ]
    };
  }
}
</script>
</body>
</html>
```
 
## Work — Work.dc.html
 
```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Work — Diya Shrivastava</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&amp;family=Public+Sans:wght@400;500;600&amp;family=Roboto+Mono:wght@500;600&amp;display=swap">
<style>
body{margin:0}
a{color:#6C3E66;text-decoration:none}
a:hover{color:#5A3355;text-decoration:underline;text-underline-offset:3px}
</style>
</helmet>
<div style="background: #F5F7F2; color: #23262B; font-family: 'Public Sans', system-ui, sans-serif; font-size: 18px; line-height: 1.65; width: 100%; min-height: 100vh">
 
  <header style="position: sticky; top: 0; z-index: 5; background: rgba(245,247,242,0.92); border-bottom: 1px solid #DEE5D8; backdrop-filter: blur(6px)">
    <div style="max-width: 1040px; margin: 0 auto; padding: 14px 32px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap">
      <a href="Main.dc.html" style="display: flex; align-items: center; gap: 10px; color: #23262B; text-decoration: none">
        <span aria-hidden="true" style="width: 34px; height: 34px; box-sizing: border-box; border: 3px double #6C3E66; border-radius: 5px; color: #6C3E66; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 13px; display: flex; align-items: center; justify-content: center; transform: rotate(-3deg)">DS</span>
        <span style="font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 20px; letter-spacing: -0.01em">Diya Shrivastava</span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 28px; font-size: 15.5px">
        <a href="Work.dc.html" aria-current="page" style="color: #6C3E66; font-weight: 600">Work</a>
        <a href="About.dc.html" style="color: #23262B">About</a>
        <a href="#" style="color: #23262B">Résumé</a>
      </nav>
    </div>
  </header>
 
  <main style="max-width: 1040px; margin: 0 auto; padding: 96px 32px 112px">
    <h1 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 46px; line-height: 1.15; letter-spacing: -0.015em">Work</h1>
    <p style="margin: 14px 0 48px; font-size: 19px; color: #5D626A; max-width: 680px">Projects where I owned the path from raw data to something people could use.</p>
 
    <div style="display: flex; flex-direction: column; gap: 20px">
      <sc-for list="{{featured}}" as="p" hint-placeholder-count="4">
        <a href="{{p.href}}" style="display: flex; flex-wrap: wrap; gap: 24px 48px; background: #EBF0E7; border-radius: 16px; padding: 32px; color: #23262B; text-decoration: none">
          <div style="flex: 999 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 10px">
            <p style="margin: 0; font-size: 14px; color: #5D626A">{{p.domain}}</p>
            <h2 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 27px; line-height: 1.2">{{p.name}}<span style="display: block; font-family: 'Public Sans', sans-serif; font-weight: 400; font-size: 15px; color: #5D626A; margin-top: 2px">{{p.sub}}</span></h2>
            <p style="margin: 0; font-size: 16.5px">{{p.line}}</p>
            <p style="margin: 0; font-size: 13.5px; color: #5D626A">{{p.stack}}</p>
            <span style="font-size: 15px; font-weight: 600; color: #6C3E66">Read case study →</span>
          </div>
          <div style="flex: 1 1 260px; min-width: 0; align-self: center; display: flex; flex-direction: column; gap: 8px">
            <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 36px; line-height: 1.15; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66; padding-bottom: 1px">{{p.v1}}</span> <span style="font-size: 15px; font-weight: 500; color: #23262B">{{p.l1}}</span></p>
            <sc-if value="{{p.isDots}}" hint-placeholder-val="{{ false }}">
              <div aria-hidden="true" style="display: flex; flex-wrap: wrap; gap: 4px; max-width: 260px; margin-top: 4px"><sc-for list="{{p.dots}}" as="d" hint-placeholder-count="31"><span style="width: 8px; height: 8px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #6C3E66; background: {{d.fill}}"></span></sc-for></div>
            </sc-if>
            <sc-if value="{{p.isLift}}" hint-placeholder-val="{{ false }}">
              <div aria-hidden="true" style="display: flex; flex-direction: column; gap: 5px; max-width: 260px; margin-top: 4px">
                <div style="display: flex; align-items: center; gap: 8px"><span style="flex: 1 1 auto; position: relative; height: 8px; border-radius: 999px; background: #FFFFFF; border: 1px solid #D3DBCD; overflow: hidden"><span style="position: absolute; left: 0; top: 0; bottom: 0; width: 97.3%; background: #6C3E66"></span></span><span style="flex: none; width: 64px; font-family: 'Roboto Mono', monospace; font-size: 11.5px; color: #23262B">top 1%</span></div>
                <div style="display: flex; align-items: center; gap: 8px"><span style="flex: 1 1 auto; position: relative; height: 8px; border-radius: 999px; background: #FFFFFF; border: 1px solid #D3DBCD; overflow: hidden"><span style="position: absolute; left: 0; top: 0; bottom: 0; width: 6%; background: #8B9089"></span></span><span style="flex: none; width: 64px; font-family: 'Roboto Mono', monospace; font-size: 11.5px; color: #5D626A">all</span></div>
              </div>
            </sc-if>
            <sc-if value="{{p.isBar}}" hint-placeholder-val="{{ false }}">
              <div aria-hidden="true" style="position: relative; height: 8px; max-width: 260px; border-radius: 999px; background: #FFFFFF; border: 1px solid #D3DBCD; overflow: hidden; margin-top: 6px"><span style="position: absolute; left: 0; top: 0; bottom: 0; width: {{p.barPct}}; background: #6C3E66"></span></div>
            </sc-if>
            <sc-if value="{{p.isScale}}" hint-placeholder-val="{{ false }}">
              <div aria-hidden="true" style="position: relative; height: 26px; max-width: 260px; margin-top: 4px">
                <span style="position: absolute; left: 0; right: 0; top: 12px; height: 1px; background: #C9D3C2"></span>
                <span style="position: absolute; left: 0; top: 7px; width: 1px; height: 11px; background: #C9D3C2"></span>
                <span style="position: absolute; right: 0; top: 7px; width: 1px; height: 11px; background: #C9D3C2"></span>
                <span style="position: absolute; left: 39.2%; width: 48.2%; top: 11px; height: 3px; background: #E3D3E0"></span>
                <span style="position: absolute; left: calc(39.2% - 5px); top: 7px; width: 10px; height: 10px; border-radius: 50%; background: #6C3E66"></span>
                <span style="position: absolute; left: calc(87.4% - 5px); top: 7px; width: 10px; height: 10px; border-radius: 50%; box-sizing: border-box; border: 1.5px solid #5D626A; background: #EBF0E7"></span>
              </div>
            </sc-if>
            <p style="margin: 0; font-size: 13.5px; color: #5D626A; line-height: 1.45">{{p.c1}}</p>
            <p style="margin: 6px 0 0; padding-top: 10px; border-top: 1px solid #D3DBCD; font-size: 14px; color: #5D626A; line-height: 1.45"><span style="font-family: 'Roboto Mono', monospace; color: #23262B">{{p.v2}}</span> — {{p.c2}}</p>
          </div>
        </a>
      </sc-for>
    </div>
 
    <div style="margin-top: 48px">
      <button type="button" onClick="{{toggle}}" aria-expanded="{{open}}" aria-controls="learning" style="min-height: 46px; padding: 0 24px; border-radius: 999px; border: 1px solid rgba(35,38,43,0.22); background: transparent; color: #23262B; font-family: 'Public Sans', sans-serif; font-weight: 600; font-size: 15.5px; cursor: pointer">{{toggleLabel}}</button>
      <sc-if value="{{open}}" hint-placeholder-val="{{ false }}">
        <div id="learning" style="margin-top: 36px">
          <h2 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.25">Learning projects</h2>
          <p style="margin: 10px 0 24px; font-size: 17px; color: #5D626A; max-width: 680px">Smaller projects I built earlier in 2026 while learning. They're here as a record of how I got to the work above.</p>
          <div style="border-bottom: 1px solid #DEE5D8">
            <sc-for list="{{learning}}" as="l" hint-placeholder-count="3">
              <div style="display: flex; flex-wrap: wrap; gap: 8px 32px; align-items: baseline; padding: 20px 0; border-top: 1px solid #DEE5D8">
                <div style="flex: 999 1 460px; min-width: 0">
                  <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 21px; line-height: 1.3">{{l.name}} <span style="font-family: 'Public Sans', sans-serif; font-weight: 400; font-size: 15px; color: #5D626A">— {{l.sub}}</span></h3>
                  <p style="margin: 6px 0 4px; font-size: 16px">{{l.line}}</p>
                  <p style="margin: 0; font-size: 13.5px; color: #5D626A">{{l.domain}} · {{l.stack}}</p>
                </div>
                <a href="#" style="flex: none; font-size: 15px; font-weight: 600">View project →</a>
              </div>
            </sc-for>
          </div>
        </div>
      </sc-if>
    </div>
 
    <h2 style="margin: 96px 0 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.25">Learning record</h2>
    <p style="margin: 10px 0 24px; font-size: 17px; color: #5D626A; max-width: 680px">Job simulations I completed on Forage to practise real-world data problems.</p>
    <div style="overflow-x: auto">
      <table style="width: 100%; min-width: 760px; border-collapse: collapse; font-size: 15.5px">
        <thead>
          <tr style="text-align: left; color: #5D626A; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase">
            <th style="padding: 0 16px 10px 0; font-weight: 600">Company</th>
            <th style="padding: 0 16px 10px 0; font-weight: 600">Simulation</th>
            <th style="padding: 0 16px 10px 0; font-weight: 600">Date</th>
            <th style="padding: 0 16px 10px 0; font-weight: 600">What I did</th>
            <th style="padding: 0 0 10px; font-weight: 600"><span style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)">Link</span></th>
          </tr>
        </thead>
        <tbody>
          <sc-for list="{{forage}}" as="f" hint-placeholder-count="5">
            <tr style="border-top: 1px solid #DEE5D8; vertical-align: top">
              <td style="padding: 14px 16px 14px 0; font-weight: 600; white-space: nowrap">{{f.co}}</td>
              <td style="padding: 14px 16px 14px 0; white-space: nowrap">{{f.sim}}</td>
              <td style="padding: 14px 16px 14px 0; white-space: nowrap; font-family: 'Roboto Mono', monospace; font-size: 14px; color: #5D626A">{{f.date}}</td>
              <td style="padding: 14px 16px 14px 0; color: #23262B">{{f.did}}</td>
              <td style="padding: 14px 0; white-space: nowrap"><a href="#">Certificate</a></td>
            </tr>
          </sc-for>
        </tbody>
      </table>
    </div>
  </main>
 
  <footer style="border-top: 1px solid #DEE5D8; padding: 44px 0 52px">
    <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px; font-size: 15px">
      <div style="display: flex; flex-direction: column; gap: 6px"><p style="margin: 0; font-family: 'Literata', Georgia, serif; font-size: 17px">Built with care by Diya Shrivastava.</p><p style="margin: 0; font-size: 13.5px; color: #5D626A">Last updated: November 2026</p></div>
      <div style="display: flex; flex-direction: column; gap: 6px"><p style="margin: 0 0 4px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #5D626A">Contact</p><a href="#">Email</a><a href="#">GitHub</a><a href="#">LinkedIn</a></div>
      <div style="display: flex; flex-direction: column; gap: 6px"><p style="margin: 0 0 4px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #5D626A">Pages</p><a href="Work.dc.html">Work</a><a href="About.dc.html">About</a><a href="#">Résumé</a></div>
    </div>
  </footer>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1280,"height":2900}}'>
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  renderVals() {
    const open = !!this.state.open;
    const dots = [];
    for (let i = 0; i < 31; i++) dots.push({ fill: i < 29 ? '#6C3E66' : '#FFFFFF' });
    return {
      open: open,
      toggle: () => this.setState({ open: !open }),
      toggleLabel: open ? 'Hide learning projects' : 'Show 3 earlier learning projects',
      featured: [
        { href: 'CaseStudy.dc.html', domain: 'Legal & procurement · 2026', name: 'ClauseCheck', sub: 'Procurement RAG Assistant', line: "Procurement teams lose hours hunting through supplier contracts. ClauseCheck answers their questions with the exact clause cited — and refuses when the contracts don't say.", stack: 'Python · ChromaDB · BM25 · FastAPI · Streamlit', v1: '93.5%', l1: 'recall@5', c1: 'Gold clause in the top 5 for 29 of 31 questions — one dot per question.', isDots: true, dots: dots, v2: '9 of 9 refused', c2: 'every unanswerable question, with 1 of 31 wrongly refused' },
        { href: '#', domain: 'Payments & fintech risk · 2026', name: 'ChargebackLens', sub: 'Transaction Dispute Risk & Decision Engine', line: 'Payment teams have to decide, transaction by transaction, whether to allow, challenge or review. ChargebackLens turns dispute risk into the rupee-optimal decision.', stack: 'Python · Scikit-learn · Pandas · Streamlit', v1: '16.2×', l1: 'lift', c1: 'Dispute rate in the riskiest 1% (66 of 452) against 0.90% across all transactions.', isLift: true, v2: '₹11.99L net savings', c2: '39.1% of exposure' },
        { href: '#', domain: 'Product analytics · 2026 · Team project', name: 'StreakForge', sub: 'Fitness Engagement & Retention Insight Platform', line: 'Fitness apps can see who stops showing up, but not why. StreakForge shows which engagement habits keep members coming back — and finds the biggest leak is members who never get started.', stack: 'Python · Pandas · Plotly · Streamlit', v1: '81.2%', l1: 'drop-off', c1: 'Only 18.8% of members activate in their first 7 days.', isBar: true, barPct: '18.8%', v2: '27.9% vs 15.6%', c2: 'activation on the PT-Combo plan vs Basic' },
        { href: '#', domain: 'Logistics · 2026', name: 'DeliverIQ', sub: 'Delivery ETA Predictor', line: 'Customers and dispatchers need delivery times they can plan around. DeliverIQ predicts urban delivery ETAs from traffic, weather and road data.', stack: 'Python · Scikit-learn · Pandas · Streamlit', v1: '7.83 min', l1: 'MAE', c1: 'Model (filled) against the 17.48-min baseline (open), on a 0–20 min scale.', isScale: true, v2: '55% better', c2: 'than the baseline' }
      ],
      learning: [
        { name: 'HealthOps', sub: 'Hospital Resource Intelligence', domain: 'Healthcare operations · Mar–Apr 2026', stack: 'Python · Pandas · Streamlit', line: 'Hospitals need to see resource pressure before it becomes a crisis. HealthOps cleans and analyses 4,926 synthetic patient records to show patterns in inflow, ICU demand, oxygen use and bed occupancy.' },
        { name: 'ParkEase', sub: 'Smart Parking Management System', domain: 'Urban mobility · Feb–Mar 2026', stack: 'Next.js · PostgreSQL · Prisma · Redis', line: 'Drivers lose time circling for parking, and booking systems break when two people book the same spot. ParkEase checks every booking for overlaps inside a single database transaction.' },
        { name: 'CraftBridge', sub: 'Marketplace for Local Artisans', domain: 'Marketplace · Feb–Mar 2026', stack: 'Flutter · Firebase', line: 'Local artisans struggle to reach buyers. CraftBridge is a mobile marketplace prototype where approved artisans list products and buyers browse, order and track them.' }
      ],
      forage: [
        { co: 'British Airways', sim: 'Data Science', date: 'May 2026', did: 'Analysed customer reviews to find what drives sentiment, and modelled the factors behind buying behaviour.' },
        { co: 'BCG', sim: 'Data Science', date: 'Apr 2026', did: 'Scoped a customer-churn investigation, tuned a random-forest churn model to 50% recall, and wrote an executive summary.' },
        { co: 'Commonwealth Bank', sim: 'Intro to Data Science', date: 'Apr 2026', did: 'Built data pipelines, anonymised personal data for privacy, and designed a database schema.' },
        { co: 'JPMorgan Chase', sim: 'Quantitative Research', date: 'Apr 2026', did: "Estimated customers' probability of default on a loan book, and bucketed FICO scores with dynamic programming." },
        { co: 'Deloitte', sim: 'Data Analytics', date: 'Apr 2026', did: 'Built a Tableau dashboard for a forensic-technology investigation and drew business conclusions from classified data.' }
      ]
    };
  }
}
</script>
</body>
</html>
```
 
## Case study — ClauseCheck — CaseStudy.dc.html
 
```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>ClauseCheck case study — Diya Shrivastava</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&amp;family=Public+Sans:wght@400;500;600&amp;family=Roboto+Mono:wght@500;600&amp;family=Noto+Serif+JP:wght@600&amp;display=swap">
<style>
body{margin:0}
a{color:#6C3E66;text-decoration:none}
a:hover{color:#5A3355;text-decoration:underline;text-underline-offset:3px}
</style>
</helmet>
<div style="background: #F5F7F2; color: #23262B; font-family: 'Public Sans', system-ui, sans-serif; font-size: 18px; line-height: 1.65; width: 100%; min-height: 100vh">
 
  <header style="position: sticky; top: 0; z-index: 5; background: rgba(245,247,242,0.92); border-bottom: 1px solid #DEE5D8; backdrop-filter: blur(6px)">
    <div style="max-width: 1040px; margin: 0 auto; padding: 14px 32px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap">
      <a href="Main.dc.html" style="display: flex; align-items: center; gap: 10px; color: #23262B; text-decoration: none">
        <span aria-hidden="true" style="width: 34px; height: 34px; box-sizing: border-box; border: 3px double #6C3E66; border-radius: 5px; color: #6C3E66; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 13px; display: flex; align-items: center; justify-content: center; transform: rotate(-3deg)">DS</span>
        <span style="font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 20px; letter-spacing: -0.01em">Diya Shrivastava</span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 28px; font-size: 15.5px">
        <a href="Work.dc.html" style="color: #6C3E66; font-weight: 600">Work</a>
        <a href="About.dc.html" style="color: #23262B">About</a>
        <a href="#" style="color: #23262B">Résumé</a>
      </nav>
    </div>
  </header>
 
  <div style="max-width: 1040px; margin: 0 auto; padding: 72px 32px 0">
    <p style="margin: 0 0 18px; font-size: 15px"><a href="Work.dc.html">← All work</a></p>
    <p style="margin: 0; font-size: 15px; color: #5D626A">Legal &amp; procurement · Sep–Oct 2026</p>
    <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 32px">
      <div style="max-width: 820px">
        <h1 style="margin: 8px 0 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 46px; line-height: 1.15; letter-spacing: -0.015em; max-width: 820px; text-wrap: balance">ClauseCheck — Procurement RAG Assistant</h1>
        <p style="margin: 18px 0 0; font-size: 20px; line-height: 1.55; max-width: 720px">An assistant that answers plain-English questions about supplier contracts, backs every answer with the exact clause it came from, checks every figure against that clause — and refuses when the documents don't say.</p>
      </div>
      <div role="img" aria-label="誠 (makoto) — sincerity" title="誠 — sincerity" style="flex: none; margin-top: 26px; width: 78px; height: 78px; box-sizing: border-box; border-radius: 12px; background: #6C3E66; padding: 5px; transform: rotate(-4deg); box-shadow: 0 2px 10px rgba(35,38,43,0.14)"><div style="width: 100%; height: 100%; box-sizing: border-box; border: 1.5px solid rgba(255,255,255,0.7); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-family: 'Noto Serif JP', serif; font-weight: 600; font-size: 38px; line-height: 1">誠</div></div>
    </div>
 
    <table style="margin-top: 36px; width: 100%; border-collapse: collapse; font-size: 15px; border-top: 3px double #C9D3C2; border-bottom: 3px double #C9D3C2">
      <tbody>
        <tr style="vertical-align: top"><th scope="row" style="text-align: left; width: 150px; padding: 14px 24px 10px 0; font-family: 'Roboto Mono', monospace; font-size: 12.5px; font-weight: 500; letter-spacing: 0.06em; color: #5D626A">ROLE</th><td style="padding: 14px 0 10px">Group project (team of 2). I built the document and retrieval pipeline — sourcing, loading and cleaning, chunking, the evaluation question set, vector and keyword search, fusion and re-ranking — then led integration and debugging, and built versions 2 and 3, including the redesigned interface and figure checking. My teammate built the answer generation, relevance gate, citation validator, API and first frontend.</td></tr>
        <tr style="vertical-align: top; border-top: 1px solid #DEE5D8"><th scope="row" style="text-align: left; padding: 10px 24px 10px 0; font-family: 'Roboto Mono', monospace; font-size: 12.5px; font-weight: 500; letter-spacing: 0.06em; color: #5D626A">STACK</th><td style="padding: 10px 0">Python · ChromaDB · BM25 · Sentence-Transformers · Groq · Gemini · SQLite · FastAPI · Streamlit</td></tr>
        <tr style="vertical-align: top; border-top: 1px solid #DEE5D8"><th scope="row" style="text-align: left; padding: 10px 24px 14px 0; font-family: 'Roboto Mono', monospace; font-size: 12.5px; font-weight: 500; letter-spacing: 0.06em; color: #5D626A">CONTEXT</th><td style="padding: 10px 0 14px">Built during a simulated industry sprint. <a href="#" style="font-weight: 600">View code on GitHub →</a></td></tr>
      </tbody>
    </table>
    <section id="glance" style="margin-top: 88px">
      <span aria-hidden="true" style="display: block; width: 44px; border-top: 3px double #6C3E66; margin-bottom: 18px"></span>
      <h2 style="margin: 0 0 32px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.25">At a glance</h2>
      <div style="position: relative; width: 976px; height: 506px">
        <svg aria-hidden="true" width="976" height="506" viewBox="0 0 976 506" fill="none" style="position: absolute; inset: 0">
          <path d="M300 79 C 342 79, 338 253, 380 253" stroke="#6C3E66" stroke-width="1.2" opacity="0.75"></path>
          <path d="M300 253 L 380 253" stroke="#6C3E66" stroke-width="1.2" opacity="0.75"></path>
          <path d="M300 427 C 342 427, 338 253, 380 253" stroke="#6C3E66" stroke-width="1.2" opacity="0.75"></path>
          <circle cx="300" cy="79" r="3.5" fill="#6C3E66"></circle>
          <circle cx="300" cy="253" r="3.5" fill="#6C3E66"></circle>
          <circle cx="300" cy="427" r="3.5" fill="#6C3E66"></circle>
          <circle cx="380" cy="253" r="5" fill="#FFFFFF" stroke="#6C3E66" stroke-width="1.5"></circle>
        </svg>
 
        <div style="position: absolute; left: 0; top: 0; width: 300px; height: 158px; box-sizing: border-box; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 16px 20px; display: flex; flex-direction: column; gap: 4px">
          <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 25px; line-height: 1.25; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66">93.5%</span> <span style="font-size: 13.5px; font-weight: 500; color: #23262B">recall@5</span></p>
          <p style="margin: 2px 0 0; font-size: 13px; color: #5D626A; line-height: 1.4">Correct clause in the top 5 for 29 of 31 answerable questions</p>
          <div aria-hidden="true" style="margin-top: auto; display: flex; flex-wrap: wrap; gap: 3px"><sc-for list="{{recall}}" as="d" hint-placeholder-count="31"><span style="width: 7px; height: 7px; border-radius: 50%; box-sizing: border-box; border: 1.3px solid #6C3E66; background: {{d.fill}}"></span></sc-for></div>
        </div>
        <div style="position: absolute; left: 0; top: 174px; width: 300px; height: 158px; box-sizing: border-box; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 16px 20px; display: flex; flex-direction: column; gap: 4px">
          <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 25px; line-height: 1.25; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66">9 of 9</span> <span style="font-size: 13.5px; font-weight: 500; color: #23262B">refused</span></p>
          <p style="margin: 2px 0 0; font-size: 13px; color: #5D626A; line-height: 1.4">Every question the contracts can't answer was refused, not guessed</p>
          <div aria-hidden="true" style="margin-top: auto; display: flex; gap: 3px"><sc-for list="{{refused}}" as="d" hint-placeholder-count="9"><span style="width: 7px; height: 7px; border-radius: 50%; background: #6C3E66"></span></sc-for></div>
        </div>
        <div style="position: absolute; left: 0; top: 348px; width: 300px; height: 158px; box-sizing: border-box; background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 16px 20px; display: flex; flex-direction: column; gap: 4px">
          <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 25px; line-height: 1.25; color: #6C3E66"><span style="border-bottom: 3px double #6C3E66">1 of 31</span> <span style="font-size: 13.5px; font-weight: 500; color: #23262B">wrongly refused</span></p>
          <p style="margin: 2px 0 0; font-size: 13px; color: #5D626A; line-height: 1.4">A 3.2% false-refusal rate on answerable questions</p>
          <div aria-hidden="true" style="margin-top: auto; display: flex; flex-wrap: wrap; gap: 3px"><sc-for list="{{wrong}}" as="d" hint-placeholder-count="31"><span style="width: 7px; height: 7px; border-radius: 50%; box-sizing: border-box; border: 1.3px solid {{d.ring}}; background: {{d.fill}}"></span></sc-for></div>
        </div>
 
        <div style="position: absolute; left: 392px; top: 186px; width: 220px; padding: 12px 0 12px 12px">
          <p style="margin: 0; font-family: 'Literata', Georgia, serif; font-style: italic; font-size: 16px; line-height: 1.45">All three come from the 40 tuning questions. The 27 held-out questions haven't been run yet.</p>
          <p style="margin: 8px 0 0; font-size: 14px; font-weight: 600"><a href="#limitations">Read the limitation ↓</a></p>
        </div>
 
        <div style="position: absolute; left: 676px; top: 0; width: 300px; height: 158px; box-sizing: border-box; border: 1px solid #DEE5D8; border-radius: 16px; padding: 16px 20px; background: #F5F7F2">
          <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 25px; line-height: 1.25"><span style="border-bottom: 3px double #23262B">158</span> <span style="font-size: 13.5px; font-weight: 500">documents</span></p>
          <p style="margin: 6px 0 0; font-size: 13px; color: #5D626A; line-height: 1.4">From 69 suppliers, split into 8,062 clause-level chunks</p>
        </div>
        <div style="position: absolute; left: 676px; top: 174px; width: 300px; height: 158px; box-sizing: border-box; border: 1px solid #DEE5D8; border-radius: 16px; padding: 16px 20px; background: #F5F7F2">
          <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 25px; line-height: 1.25"><span style="border-bottom: 3px double #23262B">375</span> <span style="font-size: 13.5px; font-weight: 500">tests</span></p>
          <p style="margin: 6px 0 0; font-size: 13px; color: #5D626A; line-height: 1.4">Passing in the final version, up from 262 at version 1</p>
          <div aria-hidden="true" style="position: relative; margin-top: 14px; height: 8px; border-radius: 999px; background: #FFFFFF; border: 1px solid #D3DBCD; overflow: hidden"><span style="position: absolute; left: 0; top: 0; bottom: 0; width: 69.9%; background: #C9D3C2"></span><span style="position: absolute; left: 69.9%; top: 0; bottom: 0; width: 30.1%; background: #6C3E66"></span></div>
        </div>
        <div style="position: absolute; left: 676px; top: 348px; width: 300px; height: 158px; box-sizing: border-box; border: 1px solid #DEE5D8; border-radius: 16px; padding: 16px 20px; background: #F5F7F2">
          <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 25px; line-height: 1.25"><span style="border-bottom: 3px double #23262B">1–5 s</span> <span style="font-size: 13.5px; font-weight: 500">per answer</span></p>
          <p style="margin: 6px 0 0; font-size: 13px; color: #5D626A; line-height: 1.4">Typical time to a checked answer</p>
        </div>
      </div>
    </section>
  </div>
 
  <div style="max-width: 1040px; margin: 0 auto; padding: 72px 32px 0; display: flex; flex-wrap: wrap-reverse; gap: 48px; align-items: flex-start">
    <article style="flex: 999 1 600px; min-width: 0; max-width: 720px">
 
 
      <section id="problem" style="margin-top: 72px">
        <h2 style="margin: 0 0 14px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.25">The problem</h2>
        <p style="margin: 0">Procurement teams hold contracts with 100–200 suppliers, but the answer to a simple question — what are our payment terms? — can be spread across a master agreement, a statement of work, later amendments and price schedules. Checking one term by hand takes about ten minutes: find the document, make sure no amendment changed it, then find the exact clause. So people skip it — and invoices get overpaid, early-payment discounts and renewal deadlines get missed, and expired supplier certificates go unnoticed. A generic chatbot doesn't help: in a contract, a confident wrong answer is worse than none.</p>
      </section>
 
      <section id="data" style="margin-top: 72px">
        <h2 style="margin: 0 0 14px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.25">The data</h2>
        <p style="margin: 0">Mostly real, public documents: 58 commercial contracts from the CUAD dataset (Atticus Project), chosen for procurement relevance; 12 SEC EDGAR amendments paired with their original agreements; and 18 public data-processing and service-level agreements from vendors including Google Cloud, Amazon, Atlassian, Stripe, Twilio and HubSpot. I added 70 synthetic price schedules and compliance certificates, generated with a fixed seed, so every file type (PDF, HTML, Word, text) and clause type was covered.</p>
        <p style="margin: 16px 0 0">In total: 158 documents from 69 suppliers. Cleaning stripped headers, footers and redaction marks and standardised dates, so each chunk keeps a stable ID that citations can point to.</p>
      </section>
 
      <section id="approach" style="margin-top: 72px">
        <h2 style="margin: 0 0 14px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.25">Approach</h2>
        <ul style="margin: 0; padding: 0 0 0 20px; display: flex; flex-direction: column; gap: 14px">
          <li><strong>Clause-aware chunking.</strong> Contracts are split at clause boundaries, not fixed lengths, so every retrieved piece is a complete clause a citation can point to.</li>
          <li><strong>Hybrid retrieval.</strong> Meaning-based vector search finds paraphrases; keyword search (BM25) finds exact terms like "Net 45" that embeddings can blur. The two ranked lists are merged with Reciprocal Rank Fusion, then a cross-encoder re-ranks the top results.</li>
          <li><strong>Local embeddings.</strong> Embeddings run on the machine instead of through an API. With 158 documents this costs nothing and keeps the free-tier model quota for answering questions.</li>
          <li><strong>Amendments follow their originals.</strong> When an amendment is retrieved, the clause it changes in the original agreement comes with it, and vice versa, up to three links deep.</li>
          <li><strong>Refuse before guessing.</strong> If the best match scores below a tuned relevance threshold, the system refuses before calling the language model at all — no answer is invented, and no quota is spent.</li>
          <li><strong>Check every answer.</strong> After an answer is written, code — not the model — confirms that every citation exists in the documents and every number appears in the cited clause. Passing answers get a "Checked" seal; anything else is marked for a person to verify.</li>
        </ul>
      </section>
 
      <section id="integration" style="margin-top: 72px">
        <h2 style="margin: 0 0 14px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.25">Integration and debugging</h2>
        <p style="margin: 0">When the two halves of the system first ran together, 3 of 223 tests failed and generation didn't work at all. I led the integration and kept a debugging log of 37 findings — from installation failures and retired model names to answers refused after an amendment upload — and fixed 24 of them. The rest are recorded as open, partly fixed or by design. The log also records why the relevance threshold was re-tuned three times as real questions exposed where it was too strict.</p>
      </section>
 
      <section id="evaluation" style="margin-top: 72px">
        <h2 style="margin: 0 0 14px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.25">Evaluation</h2>
        <p style="margin: 0">A labelled set of 67 questions: 30 drawn from real CUAD contracts (renewal, termination, liability, pricing, compliance), 22 exact-value questions (unit prices, payment terms, certificate expiry dates), and 15 questions the documents cannot answer. The set was split into 40 tuning and 27 held-out questions. Measured on the tuning set with real models and caching off: the correct clause was in the top 5 for 29 of 31 answerable questions, all 9 unanswerable questions were refused, and 1 answerable question was wrongly refused.</p>
        <figure style="margin: 28px 0 0">
          <div style="aspect-ratio: 16 / 9; max-width: 100%; border: 1.5px dashed #C9D3C2; border-radius: 16px; background: #EBF0E7; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; text-align: center; padding: 20px; color: #5D626A; font-size: 15px">
            <span style="font-family: 'Roboto Mono', monospace; font-size: 14px; color: #23262B">fig-checked-answer.png</span>
            <span>Screenshot to add: the app answering "What are the payment terms?" for Orion</span>
          </div>
          <figcaption style="margin-top: 10px; font-size: 15px; color: #5D626A">A checked answer: the payment period comes from Amendment 1, which replaced the original clause. Every citation was found and every number matched the clause text.</figcaption>
        </figure>
      </section>
 
      <section id="results" style="margin-top: 72px">
        <h2 style="margin: 0 0 14px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.25">Results</h2>
        <p style="margin: 0">93.5% recall@5, every unanswerable question refused, a 3.2% false-refusal rate, and checked answers in one to five seconds. The final version has a redesigned interface with per-contract conversations, a "Terms found" table showing which clause is in force and since when, and an insights page tracking answer rate and speed against targets.</p>
      </section>
 
      <section id="limitations" style="margin-top: 72px">
        <h2 style="margin: 0 0 14px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.25">Limitations</h2>
        <div style="background: #FBF1E4; border-left: 3px solid #8A5A1F; border-radius: 0 16px 16px 0; padding: 22px 24px">
          <ul style="margin: 0; padding: 0 0 0 18px; display: flex; flex-direction: column; gap: 12px; font-size: 16.5px">
            <li><strong style="color: #8A5A1F">Tuned, not yet held out.</strong> All headline figures come from the 40 tuning questions — the same ones used to set the threshold. The 27 held-out questions haven't been run, so the figures may be optimistic.</li>
            <li><strong style="color: #8A5A1F">Citation accuracy isn't measured.</strong> The checks confirm citations exist and numbers match, but whether the cited clause is the right one hasn't been scored by the evaluation judge yet.</li>
            <li><strong style="color: #8A5A1F">A small evaluation set.</strong> Forty questions is a thin basis for a threshold that decides when to refuse.</li>
            <li><strong style="color: #8A5A1F">Smaller than a real repository.</strong> 158 documents is a simulation; the price schedules and certificates are synthetic, and performance on a large, messy enterprise collection is untested.</li>
            <li><strong style="color: #8A5A1F">Fragile when free models fail.</strong> If both model providers hit rate limits, a request can take over 40 seconds and end in a generic error. There's no retry or circuit breaker yet.</li>
            <li><strong style="color: #8A5A1F">Upload order matters.</strong> An amendment uploaded before its original agreement isn't linked to it.</li>
          </ul>
        </div>
      </section>
 
      <section id="next" style="margin-top: 72px">
        <h2 style="margin: 0 0 14px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.25">What I'd do next</h2>
        <ol style="margin: 0; padding: 0 0 0 22px; display: flex; flex-direction: column; gap: 10px">
          <li><strong>Run the held-out set</strong> and re-check the threshold on questions it was never tuned on.</li>
          <li><strong>Measure citation accuracy</strong> with the evaluation judge, since it's what users actually trust.</li>
          <li><strong>Compare each retriever on its own</strong> — vector only, keyword only and hybrid — to show what each part contributes.</li>
          <li><strong>Link amendments automatically</strong> by supplier and date, so upload order stops mattering.</li>
          <li><strong>Add retries and clear errors</strong> for when model providers are rate-limited.</li>
        </ol>
      </section>
    </article>
 
    <aside style="flex: 1 1 200px; min-width: 0; position: sticky; top: 96px; align-self: flex-start">
      <nav aria-label="On this page" style="font-size: 14.5px; border-left: 1px solid #DEE5D8; padding-left: 18px">
        <p style="margin: 0 0 10px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #5D626A">On this page</p>
        <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 7px">
          <li><a href="#glance" style="color: #6C3E66; font-weight: 600">At a glance</a></li>
          <li><a href="#problem" style="color: #5D626A">The problem</a></li>
          <li><a href="#data" style="color: #5D626A">The data</a></li>
          <li><a href="#approach" style="color: #5D626A">Approach</a></li>
          <li><a href="#integration" style="color: #5D626A">Integration and debugging</a></li>
          <li><a href="#evaluation" style="color: #5D626A">Evaluation</a></li>
          <li><a href="#results" style="color: #5D626A">Results</a></li>
          <li><a href="#limitations" style="color: #5D626A">Limitations</a></li>
          <li><a href="#next" style="color: #5D626A">What I'd do next</a></li>
        </ul>
      </nav>
    </aside>
  </div>
 
  <div style="max-width: 1040px; margin: 96px auto 0; padding: 0 32px">
    <nav aria-label="More projects" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px">
      <a href="#" style="display: block; background: #EBF0E7; border-radius: 16px; padding: 22px 24px; color: #23262B; text-decoration: none"><span style="display: block; font-size: 13.5px; color: #5D626A">← Previous</span><span style="font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 21px">DeliverIQ</span></a>
      <a href="#" style="display: block; background: #EBF0E7; border-radius: 16px; padding: 22px 24px; color: #23262B; text-decoration: none; text-align: right"><span style="display: block; font-size: 13.5px; color: #5D626A">Next →</span><span style="font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 21px">ChargebackLens</span></a>
    </nav>
    <p style="margin: 24px 0 0; font-size: 15.5px"><a href="Work.dc.html" style="font-weight: 600">Back to all work</a></p>
  </div>
 
  <footer style="margin-top: 112px; border-top: 1px solid #DEE5D8; padding: 44px 0 52px">
    <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px; font-size: 15px">
      <div style="display: flex; flex-direction: column; gap: 6px"><p style="margin: 0; font-family: 'Literata', Georgia, serif; font-size: 17px">Built with care by Diya Shrivastava.</p><p style="margin: 0; font-size: 13.5px; color: #5D626A">Last updated: November 2026</p></div>
      <div style="display: flex; flex-direction: column; gap: 6px"><p style="margin: 0 0 4px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #5D626A">Contact</p><a href="#">Email</a><a href="#">GitHub</a><a href="#">LinkedIn</a></div>
      <div style="display: flex; flex-direction: column; gap: 6px"><p style="margin: 0 0 4px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #5D626A">Pages</p><a href="Work.dc.html">Work</a><a href="About.dc.html">About</a><a href="#">Résumé</a></div>
    </div>
  </footer>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1280,"height":6500}}'>
class Component extends DCLogic {
  renderVals() {
    var recall = [], refused = [], wrong = [];
    for (var i = 0; i < 31; i++) {
      recall.push({ fill: i < 29 ? '#6C3E66' : '#FFFFFF' });
      wrong.push(i < 30 ? { fill: '#C9D3C2', ring: '#C9D3C2' } : { fill: '#FFFFFF', ring: '#6C3E66' });
    }
    for (var j = 0; j < 9; j++) { refused.push({}); }
    return { recall: recall, refused: refused, wrong: wrong };
  }
}
</script>
</body>
</html>
```
 
## About — About.dc.html
 
```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>About — Diya Shrivastava</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&amp;family=Public+Sans:wght@400;500;600&amp;family=Roboto+Mono:wght@500;600&amp;display=swap">
<style>
body{margin:0}
a{color:#6C3E66;text-decoration:none}
a:hover{color:#5A3355;text-decoration:underline;text-underline-offset:3px}
</style>
</helmet>
<div style="background: #F5F7F2; color: #23262B; font-family: 'Public Sans', system-ui, sans-serif; font-size: 18px; line-height: 1.65; width: 100%; min-height: 100vh">
 
  <header style="position: sticky; top: 0; z-index: 5; background: rgba(245,247,242,0.92); border-bottom: 1px solid #DEE5D8; backdrop-filter: blur(6px)">
    <div style="max-width: 1040px; margin: 0 auto; padding: 14px 32px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap">
      <a href="Main.dc.html" style="display: flex; align-items: center; gap: 10px; color: #23262B; text-decoration: none">
        <span aria-hidden="true" style="width: 34px; height: 34px; box-sizing: border-box; border: 3px double #6C3E66; border-radius: 5px; color: #6C3E66; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 13px; display: flex; align-items: center; justify-content: center; transform: rotate(-3deg)">DS</span>
        <span style="font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 20px; letter-spacing: -0.01em">Diya Shrivastava</span>
      </a>
      <nav aria-label="Main" style="display: flex; gap: 28px; font-size: 15.5px">
        <a href="Work.dc.html" style="color: #23262B">Work</a>
        <a href="About.dc.html" aria-current="page" style="color: #6C3E66; font-weight: 600">About</a>
        <a href="#" style="color: #23262B">Résumé</a>
      </nav>
    </div>
  </header>
 
  <main>
    <section style="max-width: 1040px; margin: 0 auto; padding: 96px 32px 80px">
      <div style="max-width: 680px">
        <h1 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 46px; line-height: 1.15; letter-spacing: -0.015em">About</h1>
        <p style="margin: 18px 0 40px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 27px; line-height: 1.35; text-wrap: balance">I build machine-learning systems that are honest about what they know.</p>
        <div style="display: flex; flex-direction: column; gap: 18px">
          <p style="margin: 0">Most of my projects end with a question that isn't about the model: <strong>what will someone actually do with this output?</strong> A dispute-risk score is only useful once it becomes a decision — allow, challenge or review — with a rupee cost attached. A contract assistant is only useful if a procurement team can check every answer against the clause it came from.</p>
          <p style="margin: 0">That question shapes how I work. I split data the way time actually flows, so a model never learns from the future. I <strong>calibrate</strong> scores so that a 10% risk really means 10%. And I test what a system does when it doesn't know: <a href="CaseStudy.dc.html" style="text-decoration: underline; text-underline-offset: 3px">ClauseCheck</a> <strong>refuses rather than guesses</strong>, and ChargebackLens shows the segments where it <strong>shouldn't be deployed at all</strong>. Some of my most important results are the ones that say no.</p>
          <p style="margin: 0">I study Computer Science (Software Product Engineering) at Lovely Professional University, where I hold a 9.10 CGPA. I started out building full-stack and mobile apps before moving into machine learning and GenAI. I'm looking for a team that has shipped models into the real world, and where being careful is treated as part of being good.</p>
        </div>
      </div>
    </section>
 
    <section style="position: relative; overflow: hidden; background: #EBF0E7; padding: 88px 0 96px">
      <div aria-hidden="true" style="position: absolute; inset: 0; background-image: repeating-radial-gradient(ellipse 900px 520px at 18% 22%, transparent 0 30px, rgba(108,62,102,0.055) 30px 31px), repeating-radial-gradient(ellipse 760px 600px at 88% 78%, transparent 0 34px, rgba(35,38,43,0.04) 34px 35px); pointer-events: none"></div>
      <div style="position: relative; max-width: 1040px; margin: 0 auto; padding: 0 32px">
        <h2 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 32px; line-height: 1.25; text-align: center">My path</h2>
        <p style="margin: 8px 0 40px; text-align: center; font-size: 16px; color: #5D626A">The climb so far, then every step of the trail — newest first.</p>
        <div style="max-width: 920px; margin: 0 auto 72px">
          <section aria-labelledby="elev-h" style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 22px 26px 18px">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap">
              <div style="min-width: 0">
                <h3 id="elev-h" style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 21px; line-height: 1.3">Elevation gained</h3>
                <p style="margin: 2px 0 0; font-size: 13.5px; color: #5D626A">Milestones completed since 2024 — projects, certifications, simulations and programs</p>
                <p aria-live="polite" style="margin: 8px 0 0; font-family: 'Roboto Mono', monospace; font-size: 34px; font-weight: 600; line-height: 1.15"><span style="border-bottom: 3px double #23262B; padding-bottom: 1px">{{count}}</span> <span style="font-size: 14px; font-weight: 500; color: #2E6B47">{{delta}}</span></p>
              </div>
              <div role="group" aria-label="Choose a checkpoint" style="display: flex; flex-wrap: wrap; gap: 4px; background: #EBF0E7; border-radius: 999px; padding: 4px">
                <sc-for list="{{periods}}" as="per" hint-placeholder-count="5">
                  <sc-if value="{{per.on}}" hint-placeholder-val="{{ false }}">
                    <button type="button" aria-pressed="true" onClick="{{per.pick}}" style="min-height: 36px; border: 0; border-radius: 999px; padding: 0 15px; background: #6C3E66; color: #FFFFFF; font-family: 'Roboto Mono', monospace; font-size: 13px; font-weight: 600; cursor: pointer">{{per.label}}</button>
                  </sc-if>
                  <sc-if value="{{per.off}}" hint-placeholder-val="{{ true }}">
                    <button type="button" aria-pressed="false" onClick="{{per.pick}}" style="min-height: 36px; border: 0; border-radius: 999px; padding: 0 15px; background: transparent; color: #23262B; font-family: 'Roboto Mono', monospace; font-size: 13px; font-weight: 500; cursor: pointer">{{per.label}}</button>
                  </sc-if>
                </sc-for>
              </div>
            </div>
            <svg role="img" aria-label="{{chartLabel}}" viewBox="0 0 868 230" style="display: block; width: 100%; height: auto; margin-top: 14px">
              <line x1="40" y1="200" x2="850" y2="200" stroke="#DEE5D8"></line>
              <line x1="40" y1="110" x2="850" y2="110" stroke="#EEF1EB" stroke-dasharray="3 4"></line>
              <line x1="40" y1="20" x2="850" y2="20" stroke="#EEF1EB" stroke-dasharray="3 4"></line>
              <text x="30" y="204" text-anchor="end" font-family="Roboto Mono, monospace" font-size="11" fill="#5D626A">0</text>
              <text x="30" y="114" text-anchor="end" font-family="Roboto Mono, monospace" font-size="11" fill="#5D626A">10</text>
              <text x="30" y="24" text-anchor="end" font-family="Roboto Mono, monospace" font-size="11" fill="#5D626A">20</text>
              <path d="M 92 194 L 98 206 M 98 194 L 104 206" stroke="#8B9089" stroke-width="1.3"></path>
              <path d="{{fullPath}}" fill="none" stroke="#C9D3C2" stroke-width="1.5" stroke-dasharray="4 4"></path>
              <path d="{{areaPath}}" fill="#F3EAF1" stroke="none"></path>
              <path d="{{activePath}}" fill="none" stroke="#6C3E66" stroke-width="2.2" stroke-linejoin="round"></path>
              <line x1="{{dotX}}" y1="20" x2="{{dotX}}" y2="200" stroke="#6C3E66" stroke-width="1" stroke-dasharray="2 3" opacity="0.6"></line>
              <circle cx="{{dotX}}" cy="{{dotY}}" r="6" fill="#FFFFFF" stroke="#6C3E66" stroke-width="2.2"></circle>
            </svg>
            <div aria-hidden="true" style="position: relative; height: 18px; margin-top: -24px">
              <sc-for list="{{ticks}}" as="tk" hint-placeholder-count="12">
                <span style="position: absolute; left: {{tk.x}}; transform: translateX(-50%); font-family: 'Roboto Mono', monospace; font-size: 11px; color: #5D626A; white-space: nowrap">{{tk.label}}</span>
              </sc-for>
            </div>
            <p style="margin: 14px 0 0; padding-top: 12px; border-top: 1px solid #EEF1EB; font-size: 15px; line-height: 1.5"><span style="font-family: 'Roboto Mono', monospace; font-size: 13px; font-weight: 600; color: #6C3E66">{{asOf}}</span> — {{note}}</p>
          </section>
          <dl style="margin: 12px 0 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px">
            <sc-for list="{{tiles}}" as="tl" hint-placeholder-count="4">
              <div style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 14px 18px"><dt style="font-size: 14px; color: #5D626A">{{tl.name}}</dt><dd style="margin: 2px 0 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 28px; color: #6C3E66">{{tl.n}}</dd></div>
            </sc-for>
          </dl>
        </div>
        <ol style="margin: 0 auto; padding: 0; list-style: none; max-width: 920px">
          <sc-for list="{{path}}" as="t" hint-placeholder-count="16">
            <li style="display: grid; grid-template-columns: minmax(0, 1fr) 160px minmax(0, 1fr); min-height: 104px">
              <div style="display: flex; align-items: center; justify-content: flex-end; text-align: right; padding: 10px 10px 10px 0">
                <sc-if value="{{t.left}}" hint-placeholder-val="{{ false }}">
                  <div style="max-width: 360px">
                    <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 13.5px; color: #6C3E66">{{t.when}}</p>
                    <p style="margin: 2px 0 0; font-size: 16.5px; line-height: 1.5">{{t.what}}</p>
                  </div>
                </sc-if>
              </div>
              <div aria-hidden="true" style="position: relative">
                <svg viewBox="0 0 160 100" preserveAspectRatio="none" style="position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible"><path d="{{t.d}}" fill="none" stroke="#6C3E66" stroke-width="2.4" stroke-dasharray="0.5 8" stroke-linecap="round" vector-effect="non-scaling-stroke" opacity="0.85"></path></svg>
                <sc-if value="{{t.isPlain}}" hint-placeholder-val="{{ true }}">
                  <span style="position: absolute; left: {{t.x}}px; top: 50%; transform: translate(-50%, -50%); width: 15px; height: 15px; border-radius: 50%; box-sizing: border-box; background: #F5F7F2; border: 2.5px solid #6C3E66"></span>
                </sc-if>
                <sc-if value="{{t.isNow}}" hint-placeholder-val="{{ false }}">
                  <span style="position: absolute; left: {{t.x}}px; top: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; border-radius: 50%; background: #6C3E66; box-shadow: 0 0 0 7px #F3EAF1, 0 0 0 8px #6C3E66"></span>
                </sc-if>
                <sc-if value="{{t.isSummit}}" hint-placeholder-val="{{ false }}">
                  <svg width="44" height="40" viewBox="0 0 44 40" style="position: absolute; left: {{t.x}}px; top: 50%; transform: translate(-50%, -62%); overflow: visible"><path d="M3 36 L18 12 L24 21 L28 15 L41 36 Z" fill="#F5F7F2" stroke="#6C3E66" stroke-width="2" stroke-linejoin="round"></path><path d="M18 12 V2" stroke="#6C3E66" stroke-width="2" stroke-linecap="round"></path><path d="M18 2.5 L27 5.5 L18 8.5 Z" fill="#6C3E66"></path></svg>
                </sc-if>
                <sc-if value="{{t.isStart}}" hint-placeholder-val="{{ false }}">
                  <svg width="34" height="36" viewBox="0 0 34 36" style="position: absolute; left: {{t.x}}px; top: 50%; transform: translate(-50%, -38%); overflow: visible"><path d="M17 33 V6" stroke="#6C3E66" stroke-width="2.2" stroke-linecap="round"></path><path d="M8 4 H25 L30 9 L25 14 H8 Z" fill="#F3EAF1" stroke="#6C3E66" stroke-width="2" stroke-linejoin="round"></path><path d="M12 9 H22" stroke="#6C3E66" stroke-width="1.6" stroke-linecap="round" opacity="0.7"></path><path d="M8 33.5 H26" stroke="#6C3E66" stroke-width="2" stroke-linecap="round"></path></svg>
                </sc-if>
              </div>
              <div style="display: flex; align-items: center; padding: 10px 0 10px 10px">
                <sc-if value="{{t.right}}" hint-placeholder-val="{{ true }}">
                  <div style="max-width: 360px">
                    <p style="margin: 0; display: flex; align-items: center; gap: 8px; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 13.5px; color: #6C3E66">{{t.when}}<sc-if value="{{t.isNow}}" hint-placeholder-val="{{ false }}"><span style="font-family: 'Public Sans', sans-serif; font-size: 12px; font-weight: 600; background: #6C3E66; color: #FFFFFF; border-radius: 999px; padding: 1px 9px">Currently</span></sc-if></p>
                    <p style="margin: 2px 0 0; font-size: 16.5px; line-height: 1.5">{{t.what}}</p>
                  </div>
                </sc-if>
              </div>
            </li>
          </sc-for>
        </ol>
      </div>
    </section>
 
    <section style="padding: 80px 0">
      <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px">
        <h2 style="margin: 0 0 36px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 32px; line-height: 1.25">What I care about</h2>
        <div style="max-width: 680px; display: flex; flex-direction: column; gap: 30px">
          <div style="border-left: 2px solid #6C3E66; padding-left: 22px"><h3 style="margin: 0 0 4px; font-family: 'Literata', Georgia, serif; font-style: italic; font-weight: 400; font-size: 25px; line-height: 1.35">Honest numbers.</h3><p style="margin: 0; color: #5D626A; font-size: 17px">Every metric shown with its baseline and its limits.</p></div>
          <div style="border-left: 2px solid #6C3E66; padding-left: 22px"><h3 style="margin: 0 0 4px; font-family: 'Literata', Georgia, serif; font-style: italic; font-weight: 400; font-size: 25px; line-height: 1.35">Decisions, not just predictions.</h3><p style="margin: 0; color: #5D626A; font-size: 17px">A model is only useful when its output is something someone can act on.</p></div>
          <div style="border-left: 2px solid #6C3E66; padding-left: 22px"><h3 style="margin: 0 0 4px; font-family: 'Literata', Georgia, serif; font-style: italic; font-weight: 400; font-size: 25px; line-height: 1.35">Work that lasts beyond the demo.</h3><p style="margin: 0; color: #5D626A; font-size: 17px">Tests, documentation, and saying what's unfinished.</p></div>
        </div>
      </div>
    </section>
 
    <section id="certifications" style="background: #EBF0E7; padding: 80px 0">
      <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px">
        <h2 style="margin: 0 0 28px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 32px; line-height: 1.25">Certifications</h2>
        <div style="overflow-x: auto">
          <table style="width: 100%; min-width: 640px; border-collapse: collapse; font-size: 16px">
            <thead>
              <tr style="text-align: left; color: #5D626A; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase">
                <th style="padding: 0 16px 10px 0; font-weight: 600">Certification</th>
                <th style="padding: 0 16px 10px 0; font-weight: 600">Issuer</th>
                <th style="padding: 0 16px 10px 0; font-weight: 600">Date</th>
                <th style="padding: 0 0 10px; font-weight: 600"><span style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)">Link</span></th>
              </tr>
            </thead>
            <tbody>
              <sc-for list="{{certs}}" as="c" hint-placeholder-count="7">
                <tr style="border-top: 1px solid #DEE5D8">
                  <td style="padding: 13px 16px 13px 0; font-weight: 500">{{c.name}}</td>
                  <td style="padding: 13px 16px 13px 0; color: #5D626A">{{c.by}}</td>
                  <td style="padding: 13px 16px 13px 0; font-family: 'Roboto Mono', monospace; font-size: 14px; color: #5D626A; white-space: nowrap">{{c.date}}</td>
                  <td style="padding: 13px 0; white-space: nowrap"><a href="#">Verify</a></td>
                </tr>
              </sc-for>
            </tbody>
          </table>
        </div>
      </div>
    </section>
 
    <section style="padding: 80px 0 96px">
      <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px">
        <h2 style="margin: 0 0 20px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 32px; line-height: 1.25">Education</h2>
        <div style="max-width: 680px">
          <h3 style="margin: 0; font-size: 19px; font-weight: 600; line-height: 1.4">B.Tech Computer Science &amp; Engineering (Software Product Engineering)</h3>
          <p style="margin: 4px 0 18px; color: #5D626A; font-size: 16.5px">Lovely Professional University · 2024–2028 · <span style="font-family: 'Roboto Mono', monospace; font-size: 15px; color: #23262B">CGPA 9.10/10</span></p>
        </div>
        <div style="margin-top: 36px; display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap">
          <h3 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 22px">Relevant courses</h3>
          <p style="margin: 0; font-size: 14px; color: #5D626A">Completed with outstanding and excellent grades</p>
        </div>
        <div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px">
          <sc-for list="{{courseGroups}}" as="g" hint-placeholder-count="3">
            <div style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; padding: 20px 22px">
              <p style="margin: 0 0 10px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6C3E66">{{g.name}}</p>
              <ul style="margin: 0; padding: 0; list-style: none">
                <sc-for list="{{g.items}}" as="c" hint-placeholder-count="4">
                  <li style="padding: 8px 0; border-top: 1px solid #EEF1EB; font-size: 15.5px; line-height: 1.4">{{c}}</li>
                </sc-for>
              </ul>
            </div>
          </sc-for>
          <div style="background: #F3EAF1; border-radius: 16px; padding: 20px 22px">
            <p style="margin: 0 0 10px; display: flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6C3E66"><span style="width: 7px; height: 7px; border-radius: 50%; background: #6C3E66"></span>Studying now</p>
            <ul style="margin: 0; padding: 0; list-style: none">
              <li style="padding: 8px 0; border-top: 1px solid #E6D6E3; font-size: 15.5px; line-height: 1.4">Design &amp; Analysis of Algorithms</li>
              <li style="padding: 8px 0; border-top: 1px solid #E6D6E3; font-size: 15.5px; line-height: 1.4">DevOps Fundamentals</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
 
  <footer style="border-top: 1px solid #DEE5D8; padding: 44px 0 52px">
    <div style="max-width: 1040px; margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px; font-size: 15px">
      <div style="display: flex; flex-direction: column; gap: 6px"><p style="margin: 0; font-family: 'Literata', Georgia, serif; font-size: 17px">Built with care by Diya Shrivastava.</p><p style="margin: 0; font-size: 13.5px; color: #5D626A">Last updated: November 2026</p></div>
      <div style="display: flex; flex-direction: column; gap: 6px"><p style="margin: 0 0 4px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #5D626A">Contact</p><a href="#">Email</a><a href="#">GitHub</a><a href="#">LinkedIn</a></div>
      <div style="display: flex; flex-direction: column; gap: 6px"><p style="margin: 0 0 4px; font-size: 12.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #5D626A">Pages</p><a href="Work.dc.html">Work</a><a href="About.dc.html">About</a><a href="#">Résumé</a></div>
    </div>
  </footer>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1280,"height":6120}}'>
class Component extends DCLogic {
  constructor(props) { super(props); this.state = { cp: 0 }; }
  renderVals() {
    const self = this;
    // Milestones counted in the month they were completed. Index 0 = 2024–25 (trailhead), 1–11 = Jan–Nov 2026.
    const done = [
      [2, 'Certifications'], [2, 'Certifications'],
      [3, 'Projects'], [3, 'Projects'], [3, 'Certifications'], [3, 'Certifications'],
      [4, 'Projects'],
      [5, 'Projects'], [5, 'Simulations'], [5, 'Simulations'], [5, 'Simulations'], [5, 'Simulations'], [5, 'Simulations'],
      [7, 'Programs'],
      [8, 'Certifications'], [8, 'Certifications'],
      [9, 'Projects'], [9, 'Projects'], [9, 'Certifications'],
      [10, 'Projects']
    ];
    // Each point is the running total at the end of that month; Now = end of October 2026.
    const labels = ['2024–25', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const counts = labels.map(function (l, i) { return done.filter(function (d) { return d[0] <= i; }).length; });
    const X = function (i) { return i === 0 ? 40 : 140 + (i - 1) * (710 / 9); };
    const Y = function (c) { return 200 - c * 9; };
    const periods = [
      { label: 'Now', idx: 10, asOf: 'Now', note: 'ClauseCheck in October — 20 milestones since I began my B.Tech in 2024.' },
      { label: '1 month', idx: 9, asOf: '1 month ago', note: 'ChargebackLens, StreakForge and Databricks Fundamentals, all in September.' },
      { label: '3 months', idx: 7, asOf: '3 months ago', note: 'The robotics program in July, after DeliverIQ and five Forage job simulations.' },
      { label: '6 months', idx: 4, asOf: '6 months ago', note: 'ParkEase, CraftBridge and HealthOps, plus my first four certifications.' }
    ];
    const cp = this.state.cp;
    const cur = periods[cp];
    let full = '', active = '';
    for (let i = 0; i < counts.length; i++) {
      full += (i ? ' L ' : 'M ') + X(i) + ' ' + Y(counts[i]);
      if (i <= cur.idx) active += (i ? ' L ' : 'M ') + X(i) + ' ' + Y(counts[i]);
    }
    const area = active + ' L ' + X(cur.idx) + ' 200 L 40 200 Z';
    const gain = counts[cur.idx] - counts[cur.idx - 1];
    const kinds = ['Projects', 'Certifications', 'Simulations', 'Programs'];
    const rows = [
      ['2028', 'Expected graduation.'],
      ['Now', 'Building more projects, learning further technologies and looking for an internship.'],
      ['Sep–Oct 2026', 'Built ClauseCheck as a group project.'],
      ['Sep 2026', 'Earned Databricks Fundamentals.'],
      ['Aug–Sep 2026', 'Built ChargebackLens for the Razorpay AI Buildathon, and StreakForge, a fitness retention analytics platform, as a team project.'],
      ['Aug 2026', 'Earned Microsoft Power Platform PL-900 and PL-200.'],
      ['Jul 2026', 'Took part in My Equation’s 15-day Resident Robotics Program, working with ROS2, Gazebo simulation and Sim2Real methods.'],
      ['Jun 2026', 'Completed four semesters with a CGPA of 9.10/10.'],
      ['Apr–May 2026', 'Completed five Forage job simulations (BCG, JPMorgan Chase, Deloitte, Commonwealth Bank, British Airways) and built DeliverIQ.'],
      ['Mar–Apr 2026', 'Built HealthOps, hospital resource analytics.'],
      ['Mar 2026', 'Completed Anthropic Academy: AI Fluency and Claude 101.'],
      ['Feb–Mar 2026', 'Built CraftBridge, a marketplace app for local artisans.'],
      ['Feb 2026', 'Earned Microsoft Azure AI Fundamentals (AI-900) and GitHub Foundations (GH-900).'],
      ['Feb–Mar 2026', 'Built ParkEase, a full-stack smart parking platform.'],
      ['2024–2026', 'Learnt web development and computer-science fundamentals while focusing on my academic courses.'],
      ['2024', 'Began B.Tech CSE (Software Product Engineering) at Lovely Professional University, batch 2024–2028.']
    ];
    const last = rows.length - 1;
    const xs = rows.map(function (r, i) { return i === 0 ? 80 : (i % 2 ? 128 : 32); });
    const trail = function (i) {
      const x = xs[i];
      let d = '';
      if (i > 0) { const a = (xs[i - 1] + x) / 2; d += 'M ' + a + ' 0 C ' + a + ' 25, ' + x + ' 25, ' + x + ' 50'; }
      else { d += 'M ' + x + ' 50'; }
      if (i < last) { const b = (x + xs[i + 1]) / 2; d += ' C ' + x + ' 75, ' + b + ' 75, ' + b + ' 100'; }
      return d;
    };
    return {
      periods: periods.map(function (p, k) { return { label: p.label, on: k === cp, off: k !== cp, pick: function () { self.setState({ cp: k }); } }; }),
      count: counts[cur.idx],
      delta: gain > 0 ? '▲ +' + gain + ' in the last month' : 'no change in the last month',
      fullPath: full, activePath: active, areaPath: area,
      dotX: X(cur.idx), dotY: Y(counts[cur.idx]),
      chartLabel: 'Milestones completed since 2024, by month: ' + counts.map(function (c, i) { return labels[i] + ' ' + c; }).join(', ') + '. Showing ' + counts[cur.idx] + ', ' + cur.asOf.toLowerCase() + '.',
      ticks: labels.map(function (l, i) { return { x: (X(i) / 868 * 100).toFixed(2) + '%', label: l }; }),
      asOf: cur.asOf, note: cur.note,
      tiles: kinds.map(function (k) { return { name: k, n: done.filter(function (d) { return d[1] === k && d[0] <= cur.idx; }).length }; }),
      path: rows.map(function (r, i) {
        const left = i > 0 && xs[i] < 80;
        return {
          when: r[0] === 'Now' ? '' : r[0], what: r[1], x: xs[i], d: trail(i), left: left, right: !left,
          isSummit: i === 0, isStart: i === last, isNow: r[0] === 'Now', isPlain: i !== 0 && i !== last && r[0] !== 'Now'
        };
      }),
      courseGroups: [
        { name: 'Core computer science', items: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Discrete Mathematics'] },
        { name: 'Programming', items: ['Object-Oriented Programming Lab', 'Problem Solving Using Programming'] },
        { name: 'Web & product', items: ['Front-End Web Development', 'Back-End Web Development', 'Full-Stack Development', 'Design for Developers'] }
      ],
      certs: [
        { name: 'Databricks Fundamentals (Accredited)', by: 'Databricks', date: 'Sep 2026' },
        { name: 'Power Platform Functional Consultant Associate (PL-200)', by: 'Microsoft', date: 'Aug 2026' },
        { name: 'Power Platform Fundamentals (PL-900)', by: 'Microsoft', date: 'Aug 2026' },
        { name: 'AI Fluency', by: 'Anthropic Academy', date: 'Mar 2026' },
        { name: 'Claude 101', by: 'Anthropic Academy', date: 'Mar 2026' },
        { name: 'Azure AI Fundamentals (AI-900)', by: 'Microsoft', date: 'Feb 2026' },
        { name: 'GitHub Foundations (GH-900)', by: 'Microsoft', date: 'Feb 2026' }
      ]
    };
  }
}
</script>
</body>
</html>
```
 
## Style guide — StyleGuide.dc.html
 
```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Style guide — Diya Shrivastava portfolio</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&amp;family=Public+Sans:wght@400;500;600&amp;family=Roboto+Mono:wght@500;600&amp;display=swap">
<style>
body{margin:0}
a{color:#6C3E66;text-decoration:none}
a:hover{color:#5A3355;text-decoration:underline;text-underline-offset:3px}
</style>
</helmet>
<div style="width: 1280px; height: 1760px; box-sizing: border-box; padding: 72px 80px; background: #F5F7F2; color: #23262B; font-family: 'Public Sans', system-ui, sans-serif; font-size: 16px; line-height: 1.55; display: flex; flex-direction: column; gap: 56px">
 
  <div>
    <h1 style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 44px; line-height: 1.15; letter-spacing: -0.015em">Style guide</h1>
    <p style="margin: 8px 0 0; color: #5D626A; font-size: 17px">Light, calm and sincere: pale sage paper, graphite ink, one plum accent, a book serif and lots of space.</p>
  </div>
 
  <section>
    <h2 style="margin: 0 0 18px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 24px">Colour</h2>
    <div style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px">
      <sc-for list="{{colours}}" as="c" hint-placeholder-count="10">
        <div style="background: #FFFFFF; border: 1px solid #DEE5D8; border-radius: 16px; overflow: hidden">
          <div style="height: 76px; background: {{c.hex}}; border-bottom: 1px solid #DEE5D8"></div>
          <div style="padding: 10px 14px 12px">
            <p style="margin: 0; font-weight: 600; font-size: 14.5px">{{c.name}}</p>
            <p style="margin: 0; font-family: 'Roboto Mono', monospace; font-size: 12.5px; color: #5D626A">{{c.hex}}</p>
            <p style="margin: 4px 0 0; font-size: 12.5px; color: #5D626A; line-height: 1.4">{{c.use}}</p>
          </div>
        </div>
      </sc-for>
    </div>
  </section>
 
  <div style="display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 56px">
    <section>
      <h2 style="margin: 0 0 18px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 24px">Type</h2>
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div style="display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 16px; align-items: baseline; border-top: 1px solid #DEE5D8; padding-top: 14px"><p style="margin: 0; font-size: 12.5px; color: #5D626A">Display · Literata 600<br>60 / 40px</p><p style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 46px; line-height: 1.1; letter-spacing: -0.015em">People can <span style="background: linear-gradient(transparent 60%, #F3EAF1 60%)">rely on</span></p></div>
        <div style="display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 16px; align-items: baseline; border-top: 1px solid #DEE5D8; padding-top: 14px"><p style="margin: 0; font-size: 12.5px; color: #5D626A">H2 · Literata 600<br>32 / 26px</p><p style="margin: 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 32px; line-height: 1.25">How I approach a problem.</p></div>
        <div style="display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 16px; align-items: baseline; border-top: 1px solid #DEE5D8; padding-top: 14px"><p style="margin: 0; font-size: 12.5px; color: #5D626A">Value title · Literata italic<br>24 / 22px</p><p style="margin: 0; font-family: 'Literata', Georgia, serif; font-style: italic; font-size: 24px">Honest numbers.</p></div>
        <div style="display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 16px; align-items: baseline; border-top: 1px solid #DEE5D8; padding-top: 14px"><p style="margin: 0; font-size: 12.5px; color: #5D626A">Body · Public Sans 400<br>18 / 17px</p><p style="margin: 0; font-size: 18px; line-height: 1.65">A model is only useful when its output is something someone can act on.</p></div>
        <div style="display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 16px; align-items: baseline; border-top: 1px solid #DEE5D8; padding-top: 14px"><p style="margin: 0; font-size: 12.5px; color: #5D626A">Metric · Roboto Mono 600<br>36 / 32px</p><p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 36px; color: #6C3E66; line-height: 1.1">₹11.99L</p></div>
      </div>
    </section>
 
    <section>
      <h2 style="margin: 0 0 18px; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 24px">Components</h2>
      <div style="display: flex; flex-direction: column; gap: 22px">
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
          <a href="#" style="display: inline-flex; align-items: center; min-height: 46px; padding: 0 24px; border-radius: 999px; background: #6C3E66; color: #FFFFFF; font-weight: 600; font-size: 15px; text-decoration: none">See my work</a>
          <a href="#" style="display: inline-flex; align-items: center; min-height: 46px; padding: 0 24px; border-radius: 999px; border: 1px solid rgba(35,38,43,0.22); color: #23262B; font-weight: 600; font-size: 15px; text-decoration: none">Download résumé</a>
        </div>
        <p style="margin: 0; align-self: flex-start; display: inline-flex; align-items: center; gap: 9px; background: #F3EAF1; border-radius: 999px; padding: 6px 16px 6px 13px; font-size: 14px; font-weight: 500"><span style="width: 7px; height: 7px; border-radius: 50%; background: #6C3E66"></span>Open to AI/ML and Data Science internships — available now.</p>
        <div style="display: flex; gap: 28px; font-size: 15px; align-items: baseline; flex-wrap: wrap">
          <span><a href="#">Standalone link</a> <span style="color: #5D626A; font-size: 12.5px">(underline on hover)</span></span>
          <span>In a sentence, <a href="#" style="text-decoration: underline; text-underline-offset: 3px">a link</a> stays underlined.</span>
        </div>
        <p style="margin: 0; font-size: 13.5px; color: #5D626A">Tech stack · Python · Scikit-learn · Streamlit</p>
        <div style="background: #EBF0E7; border-radius: 16px; padding: 20px 22px; display: flex; gap: 24px; align-items: center">
          <div style="flex: 1 1 auto; min-width: 0"><p style="margin: 0; font-size: 13px; color: #5D626A">Project card</p><p style="margin: 2px 0 0; font-family: 'Literata', Georgia, serif; font-weight: 600; font-size: 21px">DeliverIQ</p><p style="margin: 2px 0 0; font-size: 14px; font-weight: 600; color: #6C3E66">Read case study →</p></div>
          <div style="flex: none"><p style="margin: 0; font-family: 'Roboto Mono', monospace; font-weight: 600; font-size: 30px; color: #6C3E66; line-height: 1.1">7.83 min</p><p style="margin: 2px 0 0; font-size: 13px; color: #5D626A">MAE · average prediction error</p></div>
        </div>
        <div style="background: #FBF1E4; border-left: 3px solid #8A5A1F; border-radius: 0 16px 16px 0; padding: 14px 18px; font-size: 15px"><strong style="color: #8A5A1F">Limitation callout.</strong> Mandatory on every featured case study.</div>
      </div>
    </section>
  </div>
 
  <section style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px">
    <div style="border-top: 1px solid #DEE5D8; padding-top: 14px"><p style="margin: 0; font-weight: 600">Space</p><p style="margin: 4px 0 0; font-size: 14.5px; color: #5D626A">160px between home sections on laptops, 112px on phones.</p></div>
    <div style="border-top: 1px solid #DEE5D8; padding-top: 14px"><p style="margin: 0; font-weight: 600">Width</p><p style="margin: 4px 0 0; font-size: 14.5px; color: #5D626A">680px for reading, 1040px for project lists and figures.</p></div>
    <div style="border-top: 1px solid #DEE5D8; padding-top: 14px"><p style="margin: 0; font-weight: 600">Corners</p><p style="margin: 4px 0 0; font-size: 14.5px; color: #5D626A">16px on cards and boxes; pill for buttons and the badge.</p></div>
    <div style="border-top: 1px solid #DEE5D8; padding-top: 14px"><p style="margin: 0; font-weight: 600">Motion</p><p style="margin: 4px 0 0; font-size: 14.5px; color: #5D626A">Sections fade and rise 8px over 400ms, once. Off under reduced motion.</p></div>
  </section>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1280,"height":1760}}'>
class Component extends DCLogic {
  renderVals() {
    return {
      colours: [
        { name: 'Background', hex: '#F5F7F2', use: 'Pale sage page' },
        { name: 'Surface', hex: '#FFFFFF', use: 'Now card, boxes' },
        { name: 'Muted band', hex: '#EBF0E7', use: 'Bands, project cards' },
        { name: 'Border', hex: '#DEE5D8', use: 'Hairlines' },
        { name: 'Accent tint', hex: '#F3EAF1', use: 'Highlighter, badge' },
        { name: 'Ink', hex: '#23262B', use: 'Graphite text' },
        { name: 'Ink muted', hex: '#5D626A', use: 'Captions, metadata' },
        { name: 'Accent', hex: '#6C3E66', use: 'Plum: links, buttons, metrics' },
        { name: 'Accent hover', hex: '#5A3355', use: 'Hover and pressed' },
        { name: 'Limitation', hex: '#8A5A1F', use: 'On #FBF1E4 callouts' }
      ]
    };
  }
}
</script>
</body>
</html>
```
 
