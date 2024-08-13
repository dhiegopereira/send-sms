import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms')
export default class SmsEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column()
    body: string;

    @Column()
    status: string;

    @Column()
    createdAt: Date;

    constructor(from: string, to: string, body: string, status: string, createdAt: Date) {
        this.from = from;
        this.to = to;
        this.body = body;
        this.status = status;
        this.createdAt = createdAt;
    }
}
