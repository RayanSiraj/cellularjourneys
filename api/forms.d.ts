interface ApiRequest {
    method?: string;
    body?: unknown;
}
interface ApiResponse {
    status(code: number): ApiResponse;
    setHeader(name: string, value: string): void;
    json(body: Record<string, string>): void;
}
export default function handler(req: ApiRequest, res: ApiResponse): Promise<void>;
export {};
