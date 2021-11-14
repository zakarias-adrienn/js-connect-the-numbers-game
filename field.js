export class Field {
    value = 0;
    color = "";
    x = NaN;
    y = NaN;
    hasBeenTouched = false;
  
    constructor(value, x, y, color) {
      this.value = value;
      this.x = x;
      this.y = y;
      this.color = color;
    }
}