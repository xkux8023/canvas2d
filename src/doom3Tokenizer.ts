export interface IDoom3Token {
  reset(): void
  isString(str: string): boolean
  getString(): string
  getFloat(): number
  getInt(): number
  readonly type: ETokenType
}
export interface IDoom3Tokenizer {
  setSource(source: string): void               // 设置要解析的字符串
  reset(): void                                 // 重置当前索引为0
  getNextToken(token: IDoom3Token): boolean     // 获取下一个Token
}
export interface Doom3Factory {}
export enum ETokenType {
  NONE,       // 0 default情况下, enum定义的枚举值是以 0开始的数字类型
  STRING,     // 1 表示字符串类型
  NUMBER      // 2 表示数字类型
}


class Doom3Token implements IDoom3Token {
  private _type!: ETokenType             // 标识当前Token的类型 : NONE / STRING / NUMBER
  private _charArr: string[] = []       // 字符串数组
  private _val!: number                  // 如果当前的Token类型是NUMBER, 则会设置该数值, 如果是字符串类型, 就忽略该变量

  public constructor() {
    this.reset()
  }

  public reset(): void {
    this._charArr.length = 0
    this._type = ETokenType.NONE
    this._val = 0.0
  }

  public isString(str: string): boolean {
    let count: number = this._charArr.length
    if (str.length !== count) return false
    for (let i: number = 0; i < count; i++) {
      if (str[i] !== this._charArr[i]) return false
    }
    return true
  }

  public getString(): string {
    return this._charArr.join("")
  }

  public getFloat(): number {
    return this._val
  }

  public getInt(): number {
    return parseInt(this._val.toString(), 10)
  }

  public get type(): ETokenType {
    return this._type
  }

  // 将一个char添加到_charArr数组的尾部
  public addChar(c: string): void {
    this._charArr.push(c)
  }

  // 设置数字, 并将类型设置为NUMBER
  public setVal(num: number): void {
    this._val = num
    this._type = ETokenType.NUMBER
  }

  //设置类型
  public setType(type: ETokenType): void {
    this._type = type
  }
}


class Doom3Tokenizer implements IDoom3Tokenizer {
  // 使用了初始化表达式方式初始化字符串数组
  private _digits: string[] = [ "0" , "1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" ]
  private _whiteSpaces: string[] = [ " " , "\t" , "\v" , "\n" ]
  private _source: string = "Doom3Tokenizer"
  private _currIdx: number = 0

  // 判断某个字符是不是数字
  private _isDigit(c: string) : boolean {
    for (let i: number = 0; i < this._digits.length; i++) {
      if (c === this._digits[i]) return true
    }
    return false
  }
  private _isWhitespace(c: string) : boolean {
    for (let i: number = 0; i < this._whiteSpaces.length; i++) {
      if (c === this._whiteSpaces[i]) return true
    }
    return false
  }
  //实现公开的接口方法, 设置要解析的字符串, 并且重置当前索引
  public setSource(source: string): void {
    this._source = source
    this._currIdx = 0
  }
  public reset(): void {
    this._currIdx = 0
  }
  public getNextToken(token: IDoom3Token): boolean {}
}
