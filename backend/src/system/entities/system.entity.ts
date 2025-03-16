// import { Accumulator } from "src/accumulator/entities/accumulator.entity";
// import { Solarpanel } from "src/solarpanel/entities/solarpanel.entity";
import { Users } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'system' })
export class System {
  @Column({ type: 'int', primary: true, name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'name', nullable: false })
  name: string;

  @Column({ type: 'int', name: 'solar_panel_id', nullable: false, unique: true })
  solarPanelId: number;

  @Column({ type: 'int', name: 'accumulator_id', nullable: false, unique: true })
  accumulatorId: number;

  // @Column({ type: 'varchar', length: 255, name: 'location', nullable: false })
  // location: string;

  @ManyToOne(() => Users, (user) => user.systems, { onDelete: 'CASCADE' })
  user: Users;

  // @OneToOne(() => Solarpanel, (solarPanel) => solarPanel.system, { onDelete: 'CASCADE' })
  // @JoinColumn()
  // solarPanel: Solarpanel;

  // @OneToOne(() => Accumulator, (accumulator) => accumulator.system, { onDelete: 'CASCADE' })
  // @JoinColumn()
  // accumulator: Accumulator;
}
