// import { System } from "src/system/entities/system.entity";
// import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity({ name: 'solarpanel' })
// export class Solarpanel {
//     @PrimaryGeneratedColumn('increment')
//     id: number

//     @Column({ type: 'varchar', length: 255, name: 'name', unique: true, nullable: false })
//     name: string

//     @Column({ type: 'varchar', length: 255, name: 'model', unique: true, nullable: false })
//     model: string

//     @Column({ type: 'varchar', length: 255, name: 'description', nullable: true })
//     description?: string

//     @Column({ type: 'float8', name: 'cost', nullable: false })
//     cost: number

//     @OneToOne(() => System, (system) => system.solarPanel)
//     system: System
// }
