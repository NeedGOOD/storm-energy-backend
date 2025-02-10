import { Solarpanel } from "src/solarpanel/entities/solarpanel.entity";
import { Users } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'system' })
export class System {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 255, name: 'location', nullable: false })
  location: string

  @ManyToOne(() => Users, (user) => user.systems, { onDelete: 'CASCADE' })
  user: Users

  @OneToOne(() => Solarpanel, (solarPanel) => solarPanel.system, { onDelete: 'CASCADE' })
  @JoinColumn()
  solarPanel: Solarpanel
}
