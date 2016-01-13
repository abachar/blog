export class ShortenValueConverter {
    toView(value) {
        return value.slice(0, 100);
    }
}