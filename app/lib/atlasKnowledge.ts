/**
 * Injected into the Atlas system prompt as the single source of truth
 * for answering questions about Roy Ho. Update this string whenever
 * site content changes.
 */
export const ATLAS_KNOWLEDGE = `
## Basics

- Name: Roy Ho
- UC Davis graduate with a B.S. in Statistical Data Science and a minor in Computer Science
- Based in Davis, CA and San Francisco, CA
- Currently seeking full-time Data Analyst / Data Engineer roles while building Solstice, a shoe resale analytics platform
- Interested in building data-driven solutions using Python, R, SQL, and Excel, with a focus on machine learning
- Stats: 11+ Projects, 8+ Core Tools, 25 Page AI Research Paper

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

**SF Restaurant Safety Map**
- Built an interactive map of 5,500+ San Francisco restaurant health inspections using public DataSF data, an ETL pipeline into a SQLite schema, a Flask REST API, and a React + Mapbox frontend for search, filters, and inspection details.
- Tech: Python, SQL, Flask, React, Mapbox, ETL
- GitHub: https://github.com/royho1/sf-restaurant-safety-map

**Job Analytics Dashboard**
- Built a dashboard to analyze job market trends, including salaries, skills, and geographic differences across roles.
- Tech: Python, Data Visualization
- GitHub: https://github.com/royho1/job-market-analysis-dashboard

**Drowsy Driver Detection**
- Built a real-time drowsiness detection system using computer vision techniques and a CNN model trained on eye-state data.
- Tech: Python, OpenCV, CNN
- Award: Award Winner: Best Execution
- GitHub: https://github.com/royho1/drowsy-driver-detection

### Additional Projects

**Heart Stroke Risk Prediction**
- Machine learning model to predict stroke risk from healthcare data, with preprocessing, training, and an interactive Streamlit app.
- Tech: Python, scikit-learn, Streamlit
- GitHub: https://github.com/royho1/heart-stroke-risk-prediction

**Portuguese Wine Type and Quality Prediction**
- Classified red vs. white wines and predicted quality ratings using logistic regression, LDA, and PCA on chemical properties.
- Tech: Python, scikit-learn, PCA
- GitHub: https://github.com/royho1/wine-quality-classification

**Stock Trading Algorithm**
- Built a multi-factor stock screening model with NLP sentiment analysis (FinBERT), supervised classification, and an automated daily ETL pipeline delivering real-time investment signals.
- Note: This is the same body of work Roy led as Head of Data Engineering at TechSprint Innovators, not a separate project.
- Tech: Python, scikit-learn, NLP, ETL

**NBA Player Performance Prediction**
- Predicted 5th-season NBA player performance using regression and classification models on historical stats and draft data.
- Tech: Python, Random Forest, Gradient Boosting
- GitHub: https://github.com/royho1/nba-player-prediction

**Analyzing Movie Reviews Across Genres**
- Scraped and compared IMDb audience reviews with professional critic reviews using sentiment analysis and NLP models.
- Tech: Python, Selenium, VADER, RoBERTa
- GitHub: https://github.com/royho1/movie-reviews-analysis

**Drake Time Series Analysis**
- Forecasted Drake's popularity trends using 14 years of Google Trends data with ARMA and ARIMA models.
- Tech: R, forecast, ggplot2
- GitHub: https://github.com/royho1/drake-time-series-project

**NBA Player Salary Analysis**
- Analyzed the relationship between player performance metrics and salary structures using regression and clustering.
- Tech: R, tidyverse, ggplot2
- GitHub: https://github.com/royho1/nba-salary-analysis

**Socioeconomic Predictors of Crime Rates**
- Modeled the relationship between poverty, unemployment, and crime rates using multiple linear regression and model selection.
- Tech: R, ANOVA, AIC/BIC
- GitHub: https://github.com/royho1/socioeconomic-predictors-of-crime-rates

**Graph-Based Shortest Path Analysis (Six Degrees of Kevin Bacon)**
- Built a graph traversal algorithm to compute degrees of separation between actors through shared movie appearances.
- Tech: Python, BFS, Graph Algorithms
- GitHub: https://github.com/royho1/six-degrees-kevin-bacon

## Skills

Python, SQL, Tableau, Power BI, Excel, R, Pandas, Scikit-learn, Data Visualization, Machine Learning

## Hobbies

Outside of work, Roy enjoys thrifting, bass fishing, spending time outdoors, and playing poker. He also loves keeping up with fashion and music.

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
