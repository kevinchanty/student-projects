import { Knex } from "knex";

interface UserRow {
    id: number
    username: string
}

export class User implements UserRow {
    id: number
    username: string

    constructor(
        row: UserRow
    ) {
        this.id = row.id
        this.username = row.username
    }

    static knex: Knex

    static table() {
        return this.knex('users')
    }

    static async getById(id: number) {
        let user = await this.table().select('id', 'username')
            .where({ id })
            .first()
        if (!user) {
            throw new Error('user not found: ' + id)
        }
        return new User(user)
    }

    async save() {
        await User.table().update({ username: this.username }).where({ id: this.id })
    }

    async changeName(name: string) {
        if (name.toLowerCase().includes('admin')) {
            throw new Error('you cannot fake admin')
        }
        this.username = name
    }
}

export class UserService {
    async updateProfile(id: number, profile: UserRow) {
        let user = await User.getById(id)
        await user.changeName(profile.username)
        await user.save()
    }
}
