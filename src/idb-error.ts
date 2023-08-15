import { CommonError, Errors, createCommonErrorClass } from 'abstract-error'
import type {ICommonErrors} from 'abstract-error'

export interface IIDBErrors extends ICommonErrors {
  AlreadyOpenedError: typeof IDBError
  OpeningError: typeof IDBError
  BlockedError: typeof IDBError
  AlreadyEndError: typeof IDBError
  AbortedError: typeof IDBError
}

export const IDBErrors = Object.assign({}, Errors) as IIDBErrors

export class IDBError extends CommonError {
  declare static createError: (
    aType: string,
    aErrorCode: number,
    ParentErrorClass?: typeof IDBError
  ) => typeof IDBError

  declare static isAlreadyOpened: (err: IDBError) => boolean
  declare static isOpening: (err: IDBError) => boolean
  declare static isBlocked: (err: IDBError) => boolean
  declare static isAlreadyEnd: (err: IDBError) => boolean
  declare static isAborted: (err: IDBError) => boolean

  declare static AlreadyOpened: number
  declare static Opening: number
  declare static Blocked: number
  declare static AlreadyEnd: number
  declare static Aborted: number
}

export function createIDBError(aType: string, aErrorCode: number, ParentErrorClass = IDBError) {
  return createCommonErrorClass(
    aType,
    aErrorCode,
    ParentErrorClass
  ) as typeof IDBError
}

IDBError.createError = createIDBError

const IDBErrorCodeStart = 0x80
const kAlreadyOpened = 0
const kOpening = 1
const kBlocked = 2
const kAlreadyEnd = 3
const kAborted = 4

const IDBErrorCodes = {
  AlreadyOpened: kAlreadyOpened,
  Opening: kOpening,
  Blocked: kBlocked,
  AlreadyEnd: kAlreadyEnd,
  Aborted: kAborted,
}

for (const k in IDBErrorCodes) {
  const Err = createIDBError(k, IDBErrorCodes[k] + IDBErrorCodeStart)
  IDBErrors[k + 'Error'] = Err
}

