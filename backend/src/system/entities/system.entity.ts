import { Users } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'system' })
export class System {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 255, name: 'location', nullable: false })
  location: string

  @ManyToOne(() => Users, (user) => user.systems, { onDelete: 'CASCADE' })
  user: Users
}
