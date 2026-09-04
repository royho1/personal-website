/**
 * Injected into the Atlas system prompt as the single source of truth
 * for answering questions about Roy Ho. Update this string whenever
 * site content changes.
 */
export const ATLAS_KNOWLEDGE = `
## Basics

- Name: Roy Ho
- UC Davis graduate with a B.S. in Statistical Data Science and a minor in Computer Science
- Currently based in San Francisco, CA
- Could see himself living in San Diego, New York, or Texas further down the road
- Available immediately for full-time roles; actively looking for Analyst or Engineering-family roles (see Target Roles)
- LinkedIn-style positioning: Data Analyst | Aspiring Data Engineer | Python, SQL, Excel, Machine Learning | UC Davis Graduate — this is flavor for how he often presents himself, not a limit on what he will consider
- Interested in building data-driven solutions using Python, R, SQL, and Excel
- Also works with data pipelines, dashboards, and analytics tools
- Stats: 13+ Projects, 16+ Core Tools, 29 Page AI Research Paper
- Certification: NVIDIA, Fundamentals of Deep Learning, October 2025

## Target Roles (loose — not a rigid allowlist)

Roy is actively applying across a wide set of titles. These are **loose**. He is open to other routes and titles as long as the role progresses his career toward **data science, AI, and related work**.

When asked if he is a good fit for a role, answer by family when possible (for example: "yes — that sits in his analytics / AI application set"), note that his list is flexible, and say yes for close variants or adjacent titles that clearly build toward data science or AI. Do **not** dump the full title list unless the visitor asks what he is applying to or wants the complete set.

### Core data / analytics
Data Analyst, Business Analyst, Business Intelligence Analyst, BI Developer, Reporting Analyst, Product Analyst, Operations Analyst, Research Analyst, Database Analyst, Growth Analyst, Marketing Analyst, Pricing Analyst

### Data engineering / analytics eng
Data Engineer, Analytics Engineer, Database Developer, Integration Engineer

### Science / ML / AI
Data Scientist, Quantitative Analyst, Machine Learning Engineer, AI Engineer, Applied AI Engineer, AI Automation Engineer, AI Test Engineer, LLM Engineer, Prompt Engineer, Model Evaluation Analyst, AI Product Analyst, Research Engineer

### Software / solutions
Software Engineer, Solutions Architect, Solutions Engineer, Sales Engineer, Deployment Strategist

### Customer / delivery technical
Technical Account Manager, Forward Deployed Engineer, Implementation Engineer, Implementation Consultant, Customer Success Engineer, Professional Services Consultant, Technical Support Engineer

### Ops / GTM / strategy
Revenue Operations Analyst, Sales Operations Analyst, GTM Operations Analyst, Business Operations Analyst, Strategy and Operations Analyst, Account Strategist, Partner Operations Analyst, Customer Operations Analyst

## Strengths / Fit

Roy ships end-to-end: data pipelines, ML models, and full-stack analytics apps (ETL → APIs → dashboards and maps). He combines statistical training with practical engineering — Python, SQL, R, Excel — and has research experience on LLM agents (first-authored 29-page review) plus team and solo delivery. He is strongest where analytical rigor meets building tools people can actually use.

## Current Focus

Right now Roy is available immediately and looking for Analyst or Engineering-family roles (see Target Roles — list is loose; open to paths toward data science and AI). He is also finishing his first-authored AI research paper, building Solstice (sneaker resale analytics; in progress; see Projects), and maintaining this portfolio site.

## Education

- St. Cecilia School — grades K through 8
- Lowell High School, San Francisco, CA
- University of California, Davis — B.S. Statistical Data Science, Minor in Computer Science, September 2022 to March 2026
- Certification: NVIDIA, Fundamentals of Deep Learning, October 2025
- Resume PDF available at /Roy_Ho_Resume.pdf (view or download experience, education, and skills)

### Coursework (recruiter reference — names and codes only)

Purpose: answer recruiters who ask what courses Roy took that are **relevant** to data, analytics, engineering, ML/AI, etc. Do **not** volunteer a full academic dump in every bio answer. Do **not** lead with coursework in "tell me about Roy" unless asked.

Hard rules:
- Share **course names and codes only**.
- **Never** mention GPA, letter grades, term GPAs, units, student ID, or any transcript performance detail — even if asked. Refuse politely and point to relevant course names or the resume.
- Prefer this curated list; do not invent courses.

Answer style:
- Default: pick **relevant** courses for the role they ask about (e.g. Data Analyst → regression, ANOVA, STA 141A/B, data & web technologies; ML roles → Statistical Learning, multivariate, probability/math stats, algorithms; DE/SWE → data structures, algorithms, networks, programming, STA 141C).
- Summarize by theme first (stats/ML, computing, math), then name a short set of strong matches.
- Only list the **full** curated set if the visitor asks for everything / a complete course list.

Curated courses (name — code):
- Algorithm Design & Analysis — ECS 122A
- Analysis of Variance — STA 106
- Applied Linear Algebra — MAT 167
- Applied Statistical Methods: Regression Analysis — STA 108
- Applied Time Series Analysis — STA 137
- Big Data & High Performance Statistical Computing — STA 141C
- Calculus — MAT 021C
- Computer Networks — ECS 115
- Data & Web Technologies for Data Analysis — STA 141B
- Data Structures — ECS 032B
- Discrete Math for Computer Science — ECS 020
- Internship in Computer Science — ECS 192
- Intro to Programming — ECS 032A
- Introduction to Abstract Mathematics — MAT 108
- Linear Algebra — MAT 022A
- Linear Algebra Computer Laboratory — MAT 022AL
- Mathematical Statistics — STA 131B
- Multivariate Data Analysis — STA 135
- Practice in Statistical Data Science — STA 160
- Probability Theory — STA 131A
- Statistical Data Science — STA 141A
- Statistical Learning I — STA 142A
- Theory of Games & Strategic Behavior — ECN 122
- Vector Analysis — MAT 021D

## Experience

### JAIKE (Journal of Artificial Intelligence and Knowledge Engineering)
- Dates: January 2025 – Present
- Title: Artificial Intelligence Researcher
- Conducted research on LLM-based automation covering API-driven system design, agent orchestration frameworks, retrieval-augmented generation (RAG), and a consolidated threat model spanning prompt injection, data leakage, and unintended action execution.
- First-authored a 29-page, 36-source review introducing a two-axis framework for LLM agent autonomy and oversight, plus a cost model pricing oversight against productivity gains; revise-and-resubmit with publication recommended.
- Served as a peer reviewer for JAIKE, evaluating submissions on retrieval methods in large language models, reasoning performance in extended tasks, and large-scale model architectures for methodological rigor and evaluation quality.

### TechSprint Innovators
- Dates: March 2024 – September 2025
- Title: Head of Data Engineering
- Built a multi-factor stock screening model using fundamental, technical, and NLP-based sentiment features (FinBERT).
- Developed and evaluated a supervised classification model in scikit-learn to predict price appreciation, performing feature selection, model tuning, and performance validation on historical market data.
- Engineered and automated a daily ETL data pipeline (Python, yfinance, Alpaca API) running on a Raspberry Pi to filter equities, generate structured CSV outputs, and deliver real-time investment signals via Discord webhook.

### AISC (AI Student Collective)
- Dates: September 2024 – April 2025
- Title: General Member
- Built machine learning models for stroke risk prediction and real-time drowsy driver detection within structured project cycles.
- Performed data preprocessing, feature engineering, model development, evaluation, and project presentations.
- Worked within quarter-long sprint cycles with defined milestones, code reviews, and final project demos, following structured machine learning development workflows from ideation to deployment.

## Projects

### Featured Projects

**SF Restaurant Safety Map** (April – May 2026)
- Full-stack web app mapping 20,000+ health inspections across 7,700+ San Francisco restaurants from the DataSF public feed (current 2024-present feed; not the retired DataSF dataset).
- A Python ETL pipeline (pandas, geopy) normalizes inspection records into a 3-table SQLite schema with cached geocoding, served through a 7-endpoint Flask REST API to a React and Mapbox frontend with debounced search, neighborhood typeahead, geolocation-based Near Me centering, and an Insights panel surfacing per-neighborhood rankings via SQL window functions.
- API and frontend are containerized with Docker Compose using a multi-stage Node-to-nginx build.
- Solo project.
- Tech: Python, SQL, Flask, React, Mapbox, ETL, Docker, SQLite
- GitHub: https://github.com/royho1/sf-restaurant-safety-map

**Job Market Analytics Dashboard** (September – December 2025)
- Group capstone dashboard analyzing the tech job market. Roy owned the data acquisition layer, writing JobSpy and Selenium scrapers that collected 23,000+ job posting records across seven role families in CA, NY, and TX, deduplicated to 6,800+ unique postings from 2,300+ companies.
- Built the resume-to-job matching engine as a weighted ranking model combining TF-IDF cosine similarity, skill overlap against a 366-term taxonomy, and an experience-proximity bonus, plus eligibility pre-filters that stripped senior-level titles and regex-extracted required years of experience to drop postings above the candidate's level. Methodology also used spaCy in the skills/taxonomy pipeline.
- Tech: Python, Flask, scikit-learn, TF-IDF, Selenium, JobSpy, spaCy
- GitHub: https://github.com/royho1/job-market-analysis-dashboard

**Drowsy Driver Detection** (January – March 2025)
- Real-time drowsiness detection system, awarded Best Execution for the AISC Winter 2025 cycle.
- Roy owned the eye-state detection layer, computing Eye Aspect Ratio from dlib's 68-point facial landmark model and frontal face detector via scipy Euclidean distance, flagging drowsiness when EAR held below a 0.25 threshold across 20 consecutive frames.
- Integrated into an OpenCV pipeline with grayscale preprocessing, convex hull eye overlays, a pygame audio alert, and graceful failure handling when model assets are missing.
- Five-person team project through the AI Student Collective (AISC).
- This portfolio also includes a **live in-browser demo** of the same EAR → alert loop (68-point eye landmarks → Eye Aspect Ratio → alert after eyes stay closed); nothing is uploaded. The project card also uses a Framer Motion SVG animation that blinks, sleeps, alerts, and wakes to illustrate the concept.
- Tech: Python, OpenCV, dlib, scipy, pygame
- GitHub: https://github.com/royho1/drowsy-driver-detection

### Additional Projects

**Solstice** (in progress, 2026)
- Sneaker resale analytics tool that identifies shoes from photos, grades condition, and tracks resale market prices over time. Currently in design and early build.
- Tech: Python, FastAPI, PostgreSQL, React, TypeScript

**Personal Portfolio Website**
- This site (royho-career.com). Fully responsive portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.
- Features interactive project filtering by skill, a dark mode toggle with smooth theme transitions, and custom Framer Motion SVG animations, including a multi-stage sequence on the Drowsy Driver project card that blinks, sleeps, alerts, and wakes to illustrate the project's concept.
- Also home to Atlas, the AI assistant answering these questions, built on the Anthropic API with a grounded knowledge base.
- Deployed on Vercel with continuous deployment from GitHub and a custom domain with automated SSL.
- Tech: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Vercel
- GitHub: https://github.com/royho1/personal-website

**Heart Stroke Risk Prediction**
- Supervised ML pipeline predicting stroke risk from health and lifestyle inputs like age, BMI, and lifestyle indicators. Roy led data preprocessing and feature engineering. The team compared logistic regression and random forest with cross-validation, selecting the final model on ROC-AUC and F1. Team project through UC Davis.
- Tech: Python, scikit-learn, Streamlit
- GitHub: https://github.com/royho1/heart-stroke-risk-prediction

**Portuguese Wine Type and Quality Prediction**
- Classified red vs. white Portuguese wines and predicted quality ratings from chemical properties across 600 wines. Reached 98.3% accuracy (AUC 0.996) on wine type with total sulfur dioxide, chlorides, and free sulfur dioxide as top predictors, and 80% accuracy (AUC 0.864) on high-quality prediction with alcohol, density, and citric acid as top indicators. Used logistic regression, LDA, MANOVA, and Hotelling's T squared, with PCA showing roughly 82% of variance explained by the first five components, and cross-validation to handle class imbalance.
- Tech: R, tidyverse, caret, PCA
- GitHub: https://github.com/royho1/wine-quality-classification

**Stock Trading Algorithm**
- Built a multi-factor stock screening model with NLP sentiment analysis (FinBERT), supervised classification, and an automated daily ETL pipeline delivering real-time investment signals. Pipeline optimization reduced latency in real-time stock analysis by about 25%.
- Note: This is the same body of work Roy led as Head of Data Engineering at TechSprint Innovators, not a separate project.
- Tech: Python, scikit-learn, NLP, ETL

**NBA Player Performance Prediction**
- Predicted NBA players' fifth-season performance from their first four seasons using a 12,843-row, 22-feature dataset. Compared linear regression, decision trees, random forests, and gradient boosted trees for regression, and LDA, QDA, and tree ensembles for classification, with a tuned random forest reaching about 73% accuracy. Key finding: simple linear models outperformed the complex tree-based ones, showing the predictive strength of prior season performance and draft position.
- Tech: Python, Random Forest, Gradient Boosting
- GitHub: https://github.com/royho1/nba-player-prediction

**Analyzing Movie Reviews Across Genres**
- Comparative sentiment analysis of roughly 3,500 IMDb audience reviews against 148 RogerEbert.com critic reviews across five genres. Roy built the RogerEbert rating extraction pipeline, discovering star ratings were encoded only in CSS class names and writing XPath selectors with regex to extract and rescale them from a 0-4 star scale to IMDb's 0-10. He also fit the RoBERTa sentiment classifier, writing a custom chunker with majority-vote aggregation to work around the 512-token input limit; RoBERTa reached a 0.85 true positive rate against VADER's 0.78, with the largest gap on negative reviews. IMDb's spoiler click-to-reveal UI required Selenium, taking about 40 minutes per genre to scrape. Comedy showed the strongest critic/audience agreement (r = 0.63), Superhero the weakest (r = 0.25). Three-person team project for STA 141B.
- Tech: Python, Selenium, VADER, RoBERTa
- GitHub: https://github.com/royho1/movie-reviews-analysis

**Drake Time Series Analysis**
- Forecasted Drake's popularity trends using 14 years of Google Trends data with ARMA and ARIMA models. Found recurring seasonal spikes aligned with major releases and public feuds.
- Tech: R, forecast, ggplot2
- GitHub: https://github.com/royho1/drake-time-series-project

**NBA Player Salary Analysis**
- Analyzed how direct stats (PPG, RPG, APG) vs. advanced metrics (PER, eFG%, Win Shares) predict NBA player salaries using linear regression.
- Tech: R, tidyverse, ggplot2
- GitHub: https://github.com/royho1/nba-salary-analysis

**Socioeconomic Predictors of Crime Rates**
- Modeled the relationship between poverty, unemployment, and crime rates using multiple linear regression and model selection. Poverty level was the most statistically significant predictor of total crime (p < 0.001).
- Tech: R, ANOVA, AIC/BIC
- GitHub: https://github.com/royho1/socioeconomic-predictors-of-crime-rates

**Graph-Based Shortest Path Analysis (Six Degrees of Kevin Bacon)**
- Built a graph traversal algorithm to compute degrees of separation between actors through shared movie appearances.
- Tech: Python, BFS, Graph Algorithms
- GitHub: https://github.com/royho1/six-degrees-kevin-bacon

## Skills

Core / site-highlighted: Python, SQL, Tableau, Power BI, Excel, R, Pandas, Scikit-learn, Docker, Git, GitHub, Flask, React, PyTorch, Data Visualization, Machine Learning

Also used across projects and work (fine to confirm if asked "does he know X?"):
- Languages / web: JavaScript, TypeScript, HTML, CSS
- Python ecosystem: NumPy, spaCy, SQLAlchemy, Matplotlib, Jupyter, BeautifulSoup, JobSpy, Selenium, OpenCV, dlib, scipy, Streamlit, FastAPI, PyTorch
- Modeling: logistic regression, Lasso, Ridge, LDA, QDA, random forests, gradient boosting, PCA, CNNs (via deep learning coursework/cert and projects), TF-IDF, NLP (FinBERT, VADER, RoBERTa)
- Data / infra: PostgreSQL, SQLite, Mapbox / Mapbox GL JS, Docker Compose, Raspberry Pi, Vite, Excel (advanced formulas, pivots, VLOOKUP)
- Tools: VS Code, Cursor

Roy has been using Python for about four years, starting in college and continuing through his projects and professional work. He has been using SQL for about two years. He is still actively deepening both, and applies them in current work like Solstice and the SF Restaurant Safety Map.

## Hobbies

Outside of work, Roy enjoys thrifting, bass fishing, spending time outdoors, and playing golf. He's also big into fashion. Music is a constant for him, with Drake, Malcolm Todd, Steve Lacy, and Baby Keem among his favorites. He follows Bay Area sports, rooting for the Warriors, Giants, and 49ers.

Roy is active and plays a lot of sports. He runs and works out regularly, and plays pickleball, spikeball, basketball, and golf. He also wake surfs (including Clear Lake, CA).

Outdoor / photo places that show up in his site hobby gallery (fine to mention when asked about hobbies, outdoors, or travel): Lake Tahoe, Yosemite National Park, Baker Beach in San Francisco, bass fishing at Lake Lagunitas, CA, and a horse photo from time outdoors.

He also loves coffee chats and meeting new people, and is always happy to connect with someone new over coffee.

Roy plays poker too. Treat this as a fun aside rather than a headline: mention it if the visitor asks about card games, poker specifically, or what else Roy is into beyond the usual list, but leave it out of a general answer about his hobbies.

## Personal

Light personal details, fine to share when asked:
- Favorite food: tacos
- Favorite color: blue
- Favorite show: Breaking Bad
- Favorite movie: Avengers: Infinity War
- Birthday: July 25 (Leo)

RESTRICTED — never volunteer these. State them only when the visitor asks about that exact attribute by name (for example "how tall is Roy"). Do not include them in any summary, bio, introduction, physical description, or answer to an open-ended question such as "tell me about Roy" or "what is Roy like." If asked to describe Roy generally or describe his appearance, answer from his background and work instead, and do not mention these attributes at all.
- Height: 6 feet
- Weight: 175 pounds
- Ethnicity: Taiwanese

## Contact

- Email: royho.career@gmail.com
- LinkedIn: https://www.linkedin.com/in/royho1/
- GitHub: https://github.com/royho1
`;
