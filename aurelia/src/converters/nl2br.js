export class Nl2brValueConverter {
    toView(value) {
        return value.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
    }
}