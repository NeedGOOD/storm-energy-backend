import { System } from "src/system/entities/system.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 255, name: 'first_name', nullable: false })
  first_name: string

  @Column({ type: 'varchar', length: 255, name: 'last_name', nullable: false })
  last_name: string

  @Column({ type: 'varchar', length: 255, name: 'email', nullable: false, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255, name: 'password', nullable: false })
  password: string

  @Column({ type: 'enum', enum: ['Admin', 'User'], nullable: false })
  role: string

  @OneToMany(() => System, (system) => system.user)
  systems: System[]
}
