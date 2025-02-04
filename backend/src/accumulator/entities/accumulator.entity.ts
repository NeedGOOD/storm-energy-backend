import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'accumulator' })
export class Accumulator {
    constructor(item: Partial<Accumulator>) {
        Object.assign(this, item)
    }

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'boolean', name: 'state', nullable: false })
    state: boolean
}
