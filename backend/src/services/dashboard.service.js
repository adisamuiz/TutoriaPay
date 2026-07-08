import { fetchInvoice, fetchWallet } from "../models/payment.model.js";
import { fetchStudentById } from "../models/student.model.js"
import { fetchStudentEnrollmentsById } from "./payment.service.js";

const fetchStudentDashboardInformation = async (studentId) => {
    try {
        const studentRes = await fetchStudentById(studentId);
        const enrollmentRes = await fetchStudentEnrollmentsById(studentId);
        const invoiceRes = await fetchInvoice(studentId); 
        const walletBalance = await fetchWallet(studentId)            
        const outstandingFee = Number(invoiceRes.expected_amount) - Number(invoiceRes.amount_paid);
        return{
            student: studentRes,
            enrollment: enrollmentRes,
            payments: {
                totalFee: invoiceRes.expected_amount,
                totalPaid: invoiceRes.amount_paid,
                outstanding: outstandingFee,
                wallet: walletBalance || 0.00
            }
        };
    } catch (error) {
        console.error(error.response?.data || error.message)
    }
}
export {fetchStudentDashboardInformation};