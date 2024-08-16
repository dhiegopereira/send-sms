import { injectable } from 'tsyringe';
import { MessageStatus } from 'twilio/lib/rest/api/v2010/account/message';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@injectable()
@Entity('sms')
export default class SmsEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', nullable: true })
    from: string;

    @Column({ type: 'varchar', nullable: true })
    to: string;

    @Column({ type: 'varchar', nullable: true })
    body: string;

    @Column({ type: 'varchar', nullable: true })
    status: MessageStatus;

    @Column({ type: 'date', nullable: true })
    createdAt: Date;

    constructor(from: string, to: string, body: string, status: MessageStatus, createdAt: Date) {
        this.from = from;
        this.to = to;
        this.body = body;
        this.status = status;
        this.createdAt = createdAt;
    }
}
