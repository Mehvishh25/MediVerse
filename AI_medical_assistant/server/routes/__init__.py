from .lab_report import lab_report_bp
from .xray_analyzer import xray_analyzer_bp
from .disease_predictor import disease_bp
from .medchatbot import medchatbot_bp
from .visual_diagnosis import visual_bp
from .diet_coach import diet_coach_bp 

def register_routes(app):
    app.register_blueprint(lab_report_bp, url_prefix="/lab")
    app.register_blueprint(xray_analyzer_bp, url_prefix="/xray")
    app.register_blueprint(disease_bp, url_prefix="/disease")
    app.register_blueprint(medchatbot_bp, url_prefix="/chatbot")
    app.register_blueprint(visual_bp, url_prefix="/api")
    app.register_blueprint(diet_coach_bp, url_prefix="/diet")
