from fastapi import APIRouter
from fastapi.responses import StreamingResponse, FileResponse
import csv, io, tempfile, os

from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors

from src.admin.service import get_admin_dashboard_data

router = APIRouter(prefix="/admin", tags=["Admin"])


# -----------------------------
# DASHBOARD API
# -----------------------------
@router.get("/dashboard")
def get_admin_dashboard():
    return get_admin_dashboard_data()


# -----------------------------
# CSV EXPORT
# -----------------------------
@router.get("/export/csv")
def export_admin_csv():
    output = io.StringIO()
    writer = csv.writer(output)

    data = get_admin_dashboard_data()

    writer.writerow(["Metric", "Value"])
    writer.writerow(["Total Claims", data["total_claims"]])
    writer.writerow(["Total Payouts", data["total_payouts"]])
    writer.writerow(["Active Policies", data["active_policies"]])
    writer.writerow(["Fraud Cases", data["fraud_cases"]])
    writer.writerow(["Total Users", data["total_users"]])
    writer.writerow(["Avg Settlement Days", data["avg_settlement_days"]])
    writer.writerow(["Settlement Rate", data["settlement_rate"]])

    output.seek(0)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=admin_dashboard_report.csv"
        },
    )


# -----------------------------
# PDF EXPORT
# -----------------------------
@router.get("/export/pdf")
def export_admin_pdf():

    data = get_admin_dashboard_data()

    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    file_path = temp_file.name

    doc = SimpleDocTemplate(file_path, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("Admin Dashboard Report", styles["Title"]))
    elements.append(Paragraph(" ", styles["Normal"]))

    table_data = [
        ["Metric", "Value"],
        ["Total Claims", data["total_claims"]],
        ["Total Payouts", data["total_payouts"]],
        ["Active Policies", data["active_policies"]],
        ["Fraud Cases", data["fraud_cases"]],
        ["Total Users", data["total_users"]],
        ["Avg Settlement Days", data["avg_settlement_days"]],
        ["Settlement Rate", data["settlement_rate"]],
    ]

    table = Table(table_data)
    table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.red),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ("BACKGROUND", (0, 1), (-1, -1), colors.whitesmoke),
        ])
    )

    elements.append(table)
    doc.build(elements)

    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename="admin_dashboard_report.pdf",
    )
