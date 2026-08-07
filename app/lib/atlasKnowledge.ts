/**
 * Injected into the Atlas system prompt as the single source of truth
 * for answering questions about Roy Ho. Update this string whenever
 * site content changes.
 */
export const ATLAS_KNOWLEDGE = `
## Basics

- Name: Roy Ho
- UC Davis graduate with a B.S. in Statistical Data Science and a minor in Computer Science
- Currently based in San Francisco, CA, and planning to stay there for the time being
- Could see himself living in San Diego, New York, or Texas further down the road
- Currently seeking full-time Data Analyst / Data Engineer roles while building Solstice (in progress, 2026), a sneaker resale analyzer
- Interested in building data-driven solutions using Python, R, SQL, and Excel, with a focus on machine learning
- Stats: 13+ Projects, 8+ Core Tools, 25 Page AI Research Paper

## Current Focus

Right now Roy is splitting his time between three things: building Solstice, a sneaker resale analyzer (see Projects); maintaining and improving this portfolio site; and preparing for interviews for data analyst and data engineer roles.

## Education

- St. Cecilia School — grades K through 8
- Lowell High School, San Francisco, CA
- University of California, Davis — B.S. Statistical Data Science, Minor in Computer Science
- Resume PDF available at /Roy_Ho_Resume.pdf (view or download experience, education, and skills)

## Experience

### JAIKE (Journal of Artificial Intelligence and Knowledge Engineering)
- Dates: January 2025 – Present
- Title: Artificial Intelligence Researcher
- Conducted research on LLM-based automation, focusing on API-driven system design, agent orchestration frameworks, and productivity applications across research, coding, and enterprise workflows.
- Authored a 25-page research paper on LLM-based automation and agent architectures, synthesizing peer-reviewed and industry research on API integration, architectural design patterns, system limitations, and responsible deployment; submitted for journal publication.
- Served as a peer reviewer for JAIKE, evaluating research on retrieval methods in large language models, reasoning performance in extended tasks, and large-scale model architectures for methodological rigor and evaluation quality.

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

**Solstice** (in progress, 2026)
- A sneaker resale analyzer. Upload photos of a pair, a 4B-parameter vision model running entirely on-device identifies the shoe and grades its condition, and the app tracks that pair's market value over time. No external AI API is used for the vision work.
- Backend is an async FastAPI service with 24 REST endpoints over an 8-table PostgreSQL schema managed with Alembic migrations. The schema deliberately separates raw per-observation marketplace data from daily rollups, so chart queries stay fast and price history stays stable as listings expire. An APScheduler job refreshes prices daily and backfills runs missed while the machine was asleep.
- The React and TypeScript dashboard uses Recharts for price trend charts, portfolio value tracking, and a per-marketplace payout comparison modeling eBay, StockX, and GOAT fee structures.
- Identification runs as three separate passes: a visual identify pass, an OCR pass that reads the style code off the size tag, and a condition pass that scores flaws on a 1 to 10 scale mapped to reseller grades. The style code is the load-bearing part. A 4B model cannot tell an original Jordan 1 Chicago from a reissue since they look identical in photos and the price gap is enormous, so a successful tag read overrides the visual guess. Anything under 0.85 confidence is shown as a guess to confirm rather than stated as fact, and a pass with no usable photo is skipped and says so instead of emitting a default.
- The pricing side keeps asking prices and sold prices in separate columns, separate chart series, and always labels which basis an estimate used. Blending them produces a number that looks authoritative and describes nothing. Sold data is not freely available (eBay's Marketplace Insights API is closed to new developers, StockX is approval-gated), so sold comps come from manual entry while eBay's free Browse API supplies active listings.
- 77 tests, all mocked, concentrated on the failure modes that are easy to miss: the asking-versus-sold rule and the eBay client. Roy validated the suite by reintroducing the original bugs and confirming the tests caught them, on the reasoning that a test which only passes on correct code proves nothing.
- Performance work on an 8 GB machine: disabling Qwen3-VL's default thinking mode cut calls from about 25 seconds to 2.6. A benchmark that looked like a clean image-resolution effect (401s, 112s, 22s, 21s) turned out to be four byte-identical requests, with the real variable being whether the 3.3 GB model was resident in memory or had been paged out.
- Current state: photo analysis, pair tracking, comps, and price estimates all work. Dashboard and trends views are next. The eBay client is written and tested against mocked responses but has not yet made a live call.
- Tech: Python/FastAPI backend with Postgres and Alembic, React + Vite frontend with Tailwind v4, and Qwen3-VL 4B running locally through Ollama.

**Personal Portfolio Website**
- This site (royho-career.com). Fully responsive portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.
- Features interactive project filtering by skill, a dark mode toggle with smooth theme transitions, and custom Framer Motion SVG animations, including a multi-stage sequence on the Drowsy Driver project card that blinks, sleeps, alerts, and wakes to illustrate the project's concept.
- Also home to Atlas, the AI assistant answering these questions, built on the Anthropic API with a grounded knowledge base.
- Deployed on Vercel with continuous deployment from GitHub and a custom domain with automated SSL.
- Tech: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Vercel
- GitHub: https://github.com/royho1/personal-website

**SF Restaurant Safety Map**
- Interactive map of 26,000+ San Francisco health inspections across 6,200+ restaurants, built on the city's public DataSF inspection feed. React and Vite frontend with Mapbox GL JS, Flask REST API, SQLite backend.
- Data is normalized into a three-table schema (restaurants, inspections, violations) with foreign keys. Each restaurant's latest scored inspection is pulled with a SQL window function rather than a subquery. Six API endpoints cover restaurant search, inspection history, citywide score distribution, and a per-ZIP drilldown showing the highest and lowest scoring restaurants in an area.
- The data pipeline fetches, cleans, and loads in three stages. Addresses missing coordinates from DataSF are backfilled through OpenStreetMap's Nominatim geocoder, rate-limited to one request per second per their usage policy and cached including confirmed misses, so a first run takes about an hour and re-runs finish in seconds.
- Frontend features debounced typeahead search, ZIP-mode search that flies to a ZIP centroid, geolocation-based "Near Me" centering, score-band filters, a Pins/Heatmap/Off layer toggle, and score-colored map pins.
- Roy also wrote a security review into the README covering SQL injection surface, CORS configuration, Flask debug mode, and Mapbox token exposure.
- Solo project.
- Tech: Python, Flask, SQLite, SQL, React, Vite, Mapbox GL JS, pandas, geopy
- GitHub: https://github.com/royho1/sf-restaurant-safety-map

**Job Market Analytics Dashboard**
- Full-stack dashboard analyzing tech job market trends across 9,000+ postings in California, New York, and Texas: salary distributions by location and title, in-demand skills by role, and posting volume over time.
- Team project from a UC Davis STA160 group. Roy's contributions were the data collection layer, scraping postings with JobSpy and Selenium, and the resume matching engine, a content-based recommender scoring a resume against job postings using TF-IDF vectorization and cosine similarity, which improved match accuracy from 30% to 60%.
- Full team stack: Flask, pandas, NumPy, spaCy for skill extraction, scikit-learn, Plotly.js, Bootstrap, deployed on Render.
- Tech: Python, Flask, scikit-learn, TF-IDF, Selenium, spaCy
- GitHub: https://github.com/royho1/job-market-analysis-dashboard

**Drowsy Driver Detection**
- Real-time driver drowsiness detection from a live webcam feed. Detection is built on dlib's 68-point facial landmark model, computing Eye Aspect Ratio with scipy and flagging drowsiness when EAR holds below a 0.25 threshold across 20 consecutive frames, with mouth landmark tracking to catch yawning. A scikit-learn classifier trained on the Kaggle MRL eye-state dataset supplements the threshold logic, integrated into a live OpenCV feed with a pygame audio alert.
- Five-person team project through the AI Student Collective (AISC), awarded Best Execution for the Winter 2025 cycle.
- Tech: Python, OpenCV, dlib, scikit-learn, scipy, imutils
- GitHub: https://github.com/royho1/drowsy-driver-detection

### Additional Projects

**Heart Stroke Risk Prediction**
- Supervised ML pipeline predicting stroke risk from health and lifestyle inputs like age, BMI, and lifestyle indicators. Roy led data preprocessing and feature engineering. The team compared logistic regression and random forest with cross-validation, selecting the final model on ROC-AUC and F1. Team project through UC Davis.
- Tech: Python, scikit-learn, Streamlit
- GitHub: https://github.com/royho1/heart-stroke-risk-prediction

**Portuguese Wine Type and Quality Prediction**
- Classified red vs. white Portuguese wines and predicted quality ratings from chemical properties across 600 wines. Reached 98.3% accuracy (AUC 0.996) on wine type with total sulfur dioxide, chlorides, and free sulfur dioxide as top predictors, and 80% accuracy (AUC 0.864) on high-quality prediction with alcohol, density, and citric acid as top indicators. Used logistic regression, LDA, MANOVA, and Hotelling's T squared, with PCA showing roughly 82% of variance explained by the first five components, and cross-validation to handle class imbalance.
- Tech: Python, scikit-learn, PCA
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
- Analyzed the relationship between player performance metrics and salary structures using regression and clustering.
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

Python, SQL, Tableau, Power BI, Excel, R, Pandas, Scikit-learn, Data Visualization, Machine Learning

Roy has been using Python for about four years, starting in college and continuing through his projects and professional work. He has been using SQL for about two years. He is still actively deepening both, and applies them in current work like Solstice and the SF Restaurant Safety Map.

## Hobbies

Outside of work, Roy enjoys thrifting, bass fishing, spending time outdoors, and playing poker. He's also big into fashion. Music is a constant for him, with Drake, Malcolm Todd, Steve Lacy, and Baby Keem among his favorites. He follows Bay Area sports, rooting for the Warriors, Giants, and 49ers.

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
