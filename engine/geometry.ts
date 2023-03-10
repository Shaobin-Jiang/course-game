export class Offset {
    constructor(public x: number, public y: number) {}

    public inside(rect: Rect): boolean {
        return this.x >= rect.x && this.x <= rect.x + rect.width && this.y >= rect.y && this.y <= rect.y + rect.height;
    }

    public copy(): Offset {
        return new Offset(this.x, this.y);
    }

    public add(arg: Offset | number): Offset {
        if (typeof arg == 'number') {
            this.x += arg;
            this.y += arg;
        } else {
            this.x += arg.x;
            this.y += arg.y;
        }
        return this;
    }

    public minus(arg: Offset | number): Offset {
        if (typeof arg == 'number') {
            this.x -= arg;
            this.y -= arg;
        } else {
            this.x -= arg.x;
            this.y -= arg.y;
        }
        return this;
    }

    public multiply(arg: Offset | number): Offset {
        if (typeof arg == 'number') {
            this.x *= arg;
            this.y *= arg;
        } else {
            this.x *= arg.x;
            this.y *= arg.y;
        }
        return this;
    }

    public divide(arg: Offset | number): Offset {
        if (typeof arg == 'number') {
            this.x /= arg;
            this.y /= arg;
        } else {
            this.x /= arg.x;
            this.y /= arg.y;
        }
        return this;
    }
}

export class Rect {
    constructor(x: number, y: number, width: number, height: number, private scale: number = 1) {
        this.x = x * this.scale;
        this.y = y * this.scale;
        this.width = width * this.scale;
        this.height = height * this.scale;
    }

    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public copy(): Rect {
        return new Rect(this.x, this.y, this.width, this.height);
    }

    public spread(): [number, number, number, number] {
        return [this.x, this.y, this.width, this.height];
    }

    public overlap(rect: Rect): boolean {
        return (
            this.x + this.width > rect.x &&
            rect.x + rect.width > this.x &&
            this.y + this.height > rect.y &&
            rect.y + rect.height > this.y
        );
    }
}
