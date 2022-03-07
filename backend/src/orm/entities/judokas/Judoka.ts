import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('judokas')
export class Judoka {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idCode: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        enum: ['MALE', 'FEMALE'],
    })
    sex: string;

    @Column()
    birthDate: Date;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}
