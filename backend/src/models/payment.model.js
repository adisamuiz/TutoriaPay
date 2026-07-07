import query from '../config/db.config.js'

const addVirtualAccount = async (studentId, virtualAccountData) => {
    const {accountRef, accountName, bankName, bankAccountNumber, bankAccountName} = virtualAccountData
    const queryText = `INSERT INTO 
        virtual_accounts (student_id, account_number, bank_name, account_name, account_ref) 
        VALUES ($1, $2, $3, $4, $5)`
    const res = await query(queryText, [studentId, bankAccountNumber, bankName, bankAccountName, accountRef])
}

const addInvoice = async (studentId, expectedAmount) => {
    const queryText = `INSERT INTO 
        invoices (student_id, expected_amount) 
        VALUES ($1, $2)`
    const res = await query(queryText, [studentId, expectedAmount])
}

const fetchInvoice = async (studentId) => {
    const queryText = `SELECT * FROM invoices WHERE student_id = $1`;
    const res = await query(queryText, [studentId]);
    return res.rows[0];
}

const fetchFromInvoiceAndVa = async (studentId) => {
    const queryText = `SELECT account_number, bank_name, account_name, expected_amount
        FROM invoices 
        JOIN virtual_accounts ON invoices.student_id = virtual_accounts.student_id
        WHERE virtual_accounts.student_id = $1`;
    const res = await query(queryText, [studentId]);
    return res.rows[0];
}

export { addVirtualAccount, addInvoice, fetchInvoice, fetchFromInvoiceAndVa }