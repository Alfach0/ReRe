import blake2b from 'blake2b'

export default class {
    static generate() {
        let hash = blake2b(16)
        hash.update('')
        return hash.digest('hex')
    }
}
