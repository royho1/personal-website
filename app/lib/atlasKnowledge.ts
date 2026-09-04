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
- Available immediately for full-time roles in data, analytics, and engineering
- Interested in building data-driven solutions using Python, R, SQL, and Excel, with a focus on machine learning
- Stats: 13+ Projects, 16+ Core Tools, 29 Page AI Research Paper
- Certification: NVIDIA, Fundamentals of Deep Learning, October 2025

## Current Focus

Right now Roy is available immediately for full-time roles in data, analytics, and engineering. He is also building Solstice, a sneaker resale analytics tool (in progress; see Projects), and maintaining this portfolio site.

## Education

- St. Cecilia School — grades K through 8
- Lowell High School, San Francisco, CA
- University of California, Davis — B.S. Statistical Data Science, Minor in Computer Science, September 2022 to March 2026
- Certification: NVIDIA, Fundamentals of Deep Learning, October 2025
- Resume PDF available at /Roy_Ho_Resume.pdf (view or download experience, education, and skills)

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

**SF Restaurant Safety Map**
- Full-stack web app mapping 20,000+ health inspections across 7,700+ San Francisco restaurants from the DataSF public feed (current 2024-present feed; not the retired DataSF dataset).
- A Python ETL pipeline (pandas, geopy) normalizes inspection records into a 3-table SQLite schema with cached geocoding, served through a 7-endpoint Flask REST API to a React and Mapbox frontend with debounced search, neighborhood typeahead, geolocation-based Near Me centering, and an Insights panel surfacing per-neighborhood rankings via SQL window functions.
- API and frontend are containerized with Docker Compose using a multi-stage Node-to-nginx build.
- Solo project.
- Tech: Python, SQL, Flask, React, Mapbox, ETL, Docker, SQLite
- GitHub: https://github.com/royho1/sf-restaurant-safety-map

**Job Market Analytics Dashboard**
- Group capstone dashboard analyzing the tech job market. Roy owned the data acquisition layer, writing JobSpy and Selenium scrapers that collected 23,000+ job posting records across seven role families in CA, NY, and TX, deduplicated to 6,800+ unique postings from 2,300+ companies.
- Built the resume-to-job matching engine as a weighted ranking model combining TF-IDF cosine similarity, skill overlap against a 366-term taxonomy, and an experience-proximity bonus, plus eligibility pre-filters that stripped senior-level titles and regex-extracted required years of experience to drop postings above the candidate's level.
- Tech: Python, Flask, scikit-learn, TF-IDF, Selenium, JobSpy
- GitHub: https://github.com/royho1/job-market-analysis-dashboard

**Drowsy Driver Detection**
- Real-time drowsiness detection system, awarded Best Execution for the AISC Winter 2025 cycle.
- Roy owned the eye-state detection layer, computing Eye Aspect Ratio from dlib's 68-point facial landmark model and frontal face detector via scipy Euclidean distance, flagging drowsiness when EAR held below a 0.25 threshold across 20 consecutive frames.
- Integrated into an OpenCV pipeline with grayscale preprocessing, convex hull eye overlays, a pygame audio alert, and graceful failure handling when model assets are missing.
- Five-person team project through the AI Student Collective (AISC).
- Tech: Python, OpenCV, dlib, scipy, pygame
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

Python, SQL, Tableau, Power BI, Excel, R, Pandas, Scikit-learn, Docker, Git, GitHub, Flask, React, PyTorch, Data Visualization, Machine Learning

Roy has been using Python for about four years, starting in college and continuing through his projects and professional work. He has been using SQL for about two years. He is still actively deepening both, and applies them in current work like Solstice and the SF Restaurant Safety Map.

## Hobbies

Outside of work, Roy enjoys thrifting, bass fishing, spending time outdoors, and playing golf. He's also big into fashion. Music is a constant for him, with Drake, Malcolm Todd, Steve Lacy, and Baby Keem among his favorites. He follows Bay Area sports, rooting for the Warriors, Giants, and 49ers.

Roy is active and plays a lot of sports. He runs and works out regularly, and plays pickleball, spikeball, basketball, and golf.

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
