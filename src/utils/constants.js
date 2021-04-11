module.exports = Object.freeze({
    ROLE_ADMIN: 1,
    ROLE_REPAIRER: 2,
    ROLE_CUSTOMER: 3,

    MESS_ERROR: 'Has error',

    STATUS_SUCCESS: 'success',
    STATUS_ERROR: 'error',

    PASSWORD_INCORRECT: "Password incorrect",
    NOT_REGISTERRED: "This phone number is not registered",
    REGISTERED_PHONENUMBER: "This phone number is registed",
    TOKEN_EXPRIED: 'Token is expired',
    AUTHORIZE_FAIL: 'Authorize fail',

    FK_ERROR: 'FK error',

    // Đang tìm thợ
    STATUS_REQUEST_FINDING: 1,
    // Thợ đã nhận đồng thời có nút Bắt đầu sửa
    STATUS_REQUEST_HASTAKEN: 2,
    // Đang sửa: chuyển sang sau khi thợ ấn vào nút Bắt đầu sửa
    STATUS_REQUEST_FIXING: 3,
    // Đã sửa xong đồng thời khi ấn vào tạo hóa đơn
    STATUS_REQUEST_FIXED: 4,
    // Đã tạo xong hóa đơn
    STATUS_REQUEST_COMPLETED: 5,
    STATUS_REQUEST_CANCELED: 6,

    //Paging
    NUMBER_REQUEST_PER_PAGE: 5,

    REPAIRER_NOT_VERIFIED: 0,
    REPAIRER_VERIFIED: 1,

    STATUS_INVOICE_DONE: "DONE",
    STATUS_INVOICE_NOT_PAYMENT: "NOT_PAYMENT"
})