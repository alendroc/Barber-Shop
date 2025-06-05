import {customAlphabet} from 'nanoid'
const ITEMS='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const generatedId=customAlphabet(ITEMS,10)