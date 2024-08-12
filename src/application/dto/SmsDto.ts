export interface SmsRequestDto {
    to: string;
    body: string;
}

export interface SmsResponseDto {
    from: string;
    to: string;
    body: string;
    status: string;
    createdAt: Date;
}
