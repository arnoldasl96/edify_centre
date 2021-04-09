const file_icon_validator = {
    getIconCode(file_mime_type) {
        switch (file_mime_type) {
            case 'application/msword':
                return 'fiv-icon-doc'
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'fiv-icon-docx'
            case 'application/pdf':
                return 'fiv-icon-pdf'
            case 'application/vnd.ms-powerpoint':
                return 'fiv-icon-ppt'
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                return 'fiv-icon-pptx'
            case 'application/vnd.ms-excel':
                return 'fiv-icon-xls'
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return 'fiv-icon-xlsx'
            default:
                return 'fiv-icon-blank'
        }
    },
}
export default file_icon_validator;