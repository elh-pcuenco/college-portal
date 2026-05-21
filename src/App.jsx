import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const styles = `
  ${FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --navy: #0d1b2a;
    --gold: #c9a84c;
    --gold-light: #f0d080;
    --cream: #faf7f0;
    --slate: #3d5a80;
    --light-slate: #e0ebf7;
    --text: #1a2433;
    --muted: #6b7c93;
    --white: #ffffff;
    --card-bg: #ffffff;
    --border: #e2ddd5;
    --reach: #c0392b;
    --match: #2471a3;
    --safety: #1e8449;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text); }

  .portal {
    min-height: 100vh;
    background: var(--cream);
    background-image: 
      radial-gradient(ellipse at 20% 0%, rgba(201,168,76,0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 100%, rgba(61,90,128,0.07) 0%, transparent 60%);
  }

  .header {
    background: var(--navy);
    padding: 28px 40px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-bottom: 3px solid var(--gold);
  }

  .header-icon {
    width: 48px; height: 48px;
    background: var(--gold);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
  }

  .header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    color: var(--white);
    letter-spacing: -0.5px;
  }

  .header p { color: rgba(255,255,255,0.55); font-size: 13px; margin-top: 2px; }

  .main { max-width: 860px; margin: 0 auto; padding: 40px 24px; }

  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
  }

  .card {
    background: var(--card-bg);
    border-radius: 16px;
    border: 1px solid var(--border);
    padding: 28px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(13,27,42,0.06);
  }

  .card h2 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: var(--navy);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-grid.three { grid-template-columns: 1fr 1fr 1fr; }
  .form-full { grid-column: 1 / -1; }

  .field { display: flex; flex-direction: column; gap: 6px; }
  .field label { font-size: 13px; font-weight: 500; color: var(--text); }

  .field input, .field select, .field textarea {
    padding: 10px 14px;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text);
    background: var(--white);
    transition: border-color 0.2s;
    outline: none;
  }

  .field input:focus, .field select:focus, .field textarea:focus {
    border-color: var(--slate);
  }

  .field textarea { resize: vertical; min-height: 72px; }

  .tag-input-wrap {
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 8px 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    background: var(--white);
    min-height: 48px;
    cursor: text;
    transition: border-color 0.2s;
  }

  .tag-input-wrap:focus-within { border-color: var(--slate); }

  .tag {
    background: var(--light-slate);
    color: var(--slate);
    border-radius: 6px;
    padding: 3px 10px 3px 10px;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .tag button {
    background: none; border: none; cursor: pointer;
    color: var(--slate); font-size: 14px; line-height: 1;
    padding: 0; display: flex; align-items: center;
  }

  .tag-input {
    border: none; outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: var(--text);
    flex: 1;
    min-width: 120px;
    background: transparent;
  }

  .hint { font-size: 11px; color: var(--muted); margin-top: 2px; }

  .submit-btn {
    width: 100%;
    padding: 16px;
    background: var(--navy);
    color: var(--white);
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    margin-top: 8px;
  }

  .submit-btn:hover { background: var(--slate); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(13,27,42,0.18); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .loading-bar {
    position: absolute; bottom: 0; left: 0; height: 3px;
    background: var(--gold);
    animation: loadSlide 2s ease-in-out infinite;
  }
  @keyframes loadSlide { 0%{width:0;left:0} 50%{width:60%;left:20%} 100%{width:0;left:100%} }

  /* Results */
  .results-header {
    text-align: center;
    padding: 32px 0 20px;
  }

  .results-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    color: var(--navy);
  }

  .results-header p { color: var(--muted); margin-top: 6px; font-size: 14px; }

  .tier-section { margin-bottom: 32px; }

  .tier-label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--border);
  }

  .tier-badge {
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .tier-badge.reach { background: #fdecea; color: var(--reach); }
  .tier-badge.match { background: #eaf2fb; color: var(--match); }
  .tier-badge.safety { background: #eafaf1; color: var(--safety); }

  .tier-desc { font-size: 13px; color: var(--muted); }

  .college-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  .college-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px 20px;
    box-shadow: 0 2px 8px rgba(13,27,42,0.05);
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .college-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(13,27,42,0.1); }

  .college-card .name {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    color: var(--navy);
    margin-bottom: 4px;
  }

  .college-card .location {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 10px;
  }

  .fit-bar-wrap { margin-bottom: 10px; }
  .fit-bar-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 4px; }
  .fit-bar { height: 6px; background: var(--light-slate); border-radius: 3px; overflow: hidden; }
  .fit-bar-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
  .fit-bar-fill.reach { background: linear-gradient(90deg, #e74c3c, #c0392b); }
  .fit-bar-fill.match { background: linear-gradient(90deg, #3498db, #2471a3); }
  .fit-bar-fill.safety { background: linear-gradient(90deg, #2ecc71, #1e8449); }

  .college-card .why {
    font-size: 12.5px;
    color: var(--text);
    line-height: 1.5;
    border-top: 1px solid var(--border);
    padding-top: 10px;
    margin-top: 8px;
  }

  .notable {
    display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px;
  }

  .notable span {
    font-size: 11px;
    background: #f4f1eb;
    color: var(--text);
    border-radius: 4px;
    padding: 2px 8px;
  }

  .reset-btn {
    display: block;
    margin: 0 auto 40px;
    padding: 12px 32px;
    background: transparent;
    border: 2px solid var(--navy);
    color: var(--navy);
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .reset-btn:hover { background: var(--navy); color: var(--white); }

  .analysis-box {
    background: var(--navy);
    color: var(--white);
    border-radius: 14px;
    padding: 22px 26px;
    margin-bottom: 28px;
    line-height: 1.7;
    font-size: 14px;
  }

  .analysis-box strong { color: var(--gold-light); }

  .error-box {
    background: #fdecea;
    border: 1px solid #f5c6c0;
    color: #922b21;
    border-radius: 10px;
    padding: 14px 18px;
    font-size: 14px;
    margin-bottom: 16px;
  }

  @media (max-width: 600px) {
    .form-grid, .form-grid.three, .college-grid { grid-template-columns: 1fr; }
    .header { padding: 20px; }
    .main { padding: 24px 16px; }
  }
`;

function TagInput({ value, onChange, placeholder }) {
  const [input, setInput] = useState("");

  const add = (text) => {
    const trimmed = text.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  const remove = (item) => onChange(value.filter(v => v !== item));

  return (
    <div className="tag-input-wrap" onClick={() => document.getElementById("ti-" + placeholder)?.focus()}>
      {value.map(v => (
        <span key={v} className="tag">
          {v}
          <button onClick={(e) => { e.stopPropagation(); remove(v); }}>×</button>
        </span>
      ))}
      <input
        id={"ti-" + placeholder}
        className="tag-input"
        value={input}
        placeholder={value.length === 0 ? placeholder : ""}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(input); }
          if (e.key === "Backspace" && !input && value.length) remove(value[value.length - 1]);
        }}
        onBlur={() => { if (input.trim()) add(input); }}
      />
    </div>
  );
}

function CollegeCard({ college, tier }) {
  return (
    <div className="college-card">
      <div className="name">{college.name}</div>
      <div className="location">{college.location}</div>
      <div className="fit-bar-wrap">
        <div className="fit-bar-label">
          <span>Fit Score</span>
          <span>{college.fitScore}%</span>
        </div>
        <div className="fit-bar">
          <div className={`fit-bar-fill ${tier}`} style={{ width: college.fitScore + "%" }} />
        </div>
      </div>
      <div className="notable">
        {(college.strengths || []).map(s => <span key={s}>{s}</span>)}
      </div>
      <div className="why">{college.why}</div>
    </div>
  );
}

export default function CollegeFitPortal() {
  const [form, setForm] = useState({
    grade: "",
    gpa: "",
    weightedGpa: "",
    satAct: "",
    clubs: [],
    sports: [],
    aps: "",
    apsCompleted: "",
    careerTrack: "",
    stateOfResidence: "",
    extraInfo: "",
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const buildPrompt = () => `
You are a college admissions counselor. A student has submitted their academic profile.
Using your knowledge of US colleges and admissions data, act as both an LLM-as-Judge (evaluating fit) 
and provide RAG-style retrieval of relevant colleges.

STUDENT PROFILE:
- Grade: ${form.grade}
- Unweighted GPA: ${form.gpa}
- Weighted GPA: ${form.weightedGpa || "not provided"}
- SAT/ACT: ${form.satAct || "not provided"}
- APs completed/in progress: ${form.apsCompleted || 0}, planning to finish: ${form.aps} total by graduation
- Clubs/Activities: ${form.clubs.join(", ") || "none listed"}
- Sports: ${form.sports.join(", ") || "none listed"}
- Career interest: ${form.careerTrack}
- State of residence: ${form.stateOfResidence || "not provided"}
- Additional notes: ${form.extraInfo || "none"}

TASK:
1. Evaluate this student's academic and extracurricular profile honestly.
2. Recommend exactly 3 REACH schools, 3 MATCH schools, and 3 SAFETY schools.
3. Base reach/match/safety on realistic admissions standards for this profile.
4. Each school must be genuinely well-suited for the stated career track.

RESPOND ONLY WITH VALID JSON in this exact structure (no markdown, no preamble):
{
  "profileSummary": "2-3 sentence honest analysis of the student's profile strengths and areas to watch",
  "reach": [
    {
      "name": "University Name",
      "location": "City, State",
      "fitScore": 72,
      "strengths": ["Program Tag", "Another Tag"],
      "why": "1-2 sentences on why this school and why it's a reach for this student."
    }
  ],
  "match": [ ...same structure, 3 schools... ],
  "safety": [ ...same structure, 3 schools... ]
}

fitScore should be 55-78 for reach, 75-88 for match, 85-97 for safety.
Strengths should be 2-3 short tags like "Strong CS", "Merit Aid", "Research Ops", "Public Ivy", etc.
Be realistic and specific. Do not recommend generic schools — match the career track.
`;

  const handleSubmit = async () => {
    setError(null);
    if (!form.grade || !form.gpa || !form.careerTrack) {
      setError("Please fill in Grade, GPA, and Career Track at minimum.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [{ role: "user", content: buildPrompt() }]
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(`API error ${response.status}: ${errData?.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const raw = data.content?.map(b => b.text || "").join("") || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResults(parsed);
    } catch (e) {
      setError(`Error: ${e.message || "Something went wrong. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="portal">
        <div className="header">
          <div className="header-icon">🎓</div>
          <div>
            <h1>College Fit Finder</h1>
            <p>AI-powered reach analysis using LLM-as-Judge + RAG matching</p>
          </div>
        </div>

        <div className="main">
          {!results ? (
            <>
              {/* Academic Profile */}
              <div className="card">
                <h2>📊 Academic Profile</h2>
                <div className="form-grid three">
                  <div className="field">
                    <label>Current Grade</label>
                    <select value={form.grade} onChange={e => set("grade", e.target.value)}>
                      <option value="">Select grade</option>
                      <option>9th Grade</option>
                      <option>10th Grade</option>
                      <option>11th Grade</option>
                      <option>12th Grade</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Unweighted GPA</label>
                    <input type="number" min="0" max="4" step="0.01" placeholder="e.g. 3.7"
                      value={form.gpa} onChange={e => set("gpa", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Weighted GPA</label>
                    <input type="number" min="0" max="5" step="0.01" placeholder="e.g. 4.2"
                      value={form.weightedGpa} onChange={e => set("weightedGpa", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>SAT / ACT Score</label>
                    <input placeholder="e.g. 1350 SAT or 30 ACT"
                      value={form.satAct} onChange={e => set("satAct", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>APs Completed So Far</label>
                    <input type="number" min="0" placeholder="e.g. 3"
                      value={form.apsCompleted} onChange={e => set("apsCompleted", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Total APs by Graduation</label>
                    <input type="number" min="0" placeholder="e.g. 8"
                      value={form.aps} onChange={e => set("aps", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>State of Residence</label>
                    <input placeholder="e.g. Virginia"
                      value={form.stateOfResidence} onChange={e => set("stateOfResidence", e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="card">
                <h2>🏅 Activities & Sports</h2>
                <div className="form-grid">
                  <div className="field">
                    <label>Clubs & Activities</label>
                    <TagInput
                      value={form.clubs}
                      onChange={v => set("clubs", v)}
                      placeholder="Type a club, press Enter..."
                    />
                    <span className="hint">e.g. Student Council, Debate, DECA, NHS</span>
                  </div>
                  <div className="field">
                    <label>Sports</label>
                    <TagInput
                      value={form.sports}
                      onChange={v => set("sports", v)}
                      placeholder="Type a sport, press Enter..."
                    />
                    <span className="hint">e.g. Varsity Soccer, JV Swimming</span>
                  </div>
                </div>
              </div>

              {/* Career & Goals */}
              <div className="card">
                <h2>🚀 Career & Goals</h2>
                <div className="form-grid">
                  <div className="field">
                    <label>Career Track / Major Interest</label>
                    <select value={form.careerTrack} onChange={e => set("careerTrack", e.target.value)}>
                      <option value="">Select a track</option>
                      <option>Computer Science / Software Engineering</option>
                      <option>Premed / Biology / Health Sciences</option>
                      <option>Business / Finance / Economics</option>
                      <option>Engineering (Mechanical / Civil / Electrical)</option>
                      <option>Law / Political Science</option>
                      <option>Education</option>
                      <option>Arts / Design / Architecture</option>
                      <option>Communications / Journalism / Media</option>
                      <option>Psychology / Social Sciences</option>
                      <option>Environmental Science / Sustainability</option>
                      <option>Nursing / Allied Health</option>
                      <option>Undecided / Exploring</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Anything else to consider?</label>
                    <textarea placeholder="Financial aid needs, geographic preference, campus size, religious affiliation, etc."
                      value={form.extraInfo} onChange={e => set("extraInfo", e.target.value)} />
                  </div>
                </div>
              </div>

              {error && <div className="error-box">⚠️ {error}</div>}

              <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>Analyzing your profile with AI… <div className="loading-bar" /></>
                ) : "Find My Best College Matches →"}
              </button>
            </>
          ) : (
            <>
              <div className="results-header">
                <div className="section-label">Your Results</div>
                <h2>College Recommendations</h2>
                <p>Based on your profile · Powered by LLM-as-Judge analysis</p>
              </div>

              <div className="analysis-box">
                <strong>Profile Analysis: </strong>{results.profileSummary}
              </div>

              {[
                { key: "reach", label: "Reach Schools", desc: "Admission is competitive but achievable with a strong application" },
                { key: "match", label: "Match Schools", desc: "Your profile aligns well with typical admitted students" },
                { key: "safety", label: "Safety Schools", desc: "Strong likelihood of admission — still great options" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="tier-section">
                  <div className="tier-label">
                    <span className={`tier-badge ${key}`}>{label}</span>
                    <span className="tier-desc">{desc}</span>
                  </div>
                  <div className="college-grid">
                    {(results[key] || []).map(c => (
                      <CollegeCard key={c.name} college={c} tier={key} />
                    ))}
                  </div>
                </div>
              ))}

              <button className="reset-btn" onClick={() => setResults(null)}>
                ← Update My Profile
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
