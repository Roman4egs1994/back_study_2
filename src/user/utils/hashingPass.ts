import crypto from 'crypto'

export const generateSalt = (): string => {
    return crypto.randomBytes(16).toString('hex')
}

export const hashPassword = (password: string, salt: string): string => {
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
}

export const verifyPassword = (inputPassword: string, storedHash: string, salt: string): boolean => {
    const hash = hashPassword(inputPassword, salt)
    return hash === storedHash
}



//upd ///lala