import {
    FilteredUser, INotification,
    IReport, IVulnerability, NotificationFetchResponse, ReportFetchResponse,
    ReportsFetchResponse,
    ReportUpdateRequest, ReportUpdateResponse, StatisticsResponse, SynchronisationResponse,
    UserLoginResponse,
    UserResponse, VulnerabilitiesFetchResponse
} from "./types";

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("Content-Type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        if (isJson && data.errors !== null) {
            throw new Error(JSON.stringify(data.errors));
        }

        throw new Error(data.message || response.statusText);
    }

    return data as T;
}

/**
 * USER
 */

export async function apiRegisterUser(
    credentials: string
): Promise<FilteredUser> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: credentials,
    });

    return handleResponse<UserResponse>(response).then((data) => data.data.user);
}

export async function apiLoginUser(credentials: string): Promise<string> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: credentials,
    });

    return handleResponse<UserLoginResponse>(response).then((data) => data.token);
}

export async function apiLogoutUser(): Promise<void> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return handleResponse<void>(response);
}

export async function apiGetAuthUser(token?: string): Promise<FilteredUser> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${SERVER_ENDPOINT}/api/users/me`, {
        method: "GET",
        credentials: "include",
        headers,
    });

    return handleResponse<UserResponse>(response).then((data) => data.data.user);
}

/**
 * REPORTS
 */

export async function apiSyncReports(): Promise<void> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/fetch`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return handleResponse<void>(response);
}

export async function apiFetchReports(
    page: number,
    limit: number,
    name: string,
    stateValues: string[],
    severityValues: string[]
): Promise<{ reports: IReport[]; results: number }> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/reports?page=${page}&limit=${limit}&name=${name}&stateValues=${JSON.stringify(stateValues)}&severityValues=${JSON.stringify(severityValues)}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return handleResponse<ReportsFetchResponse>(response).then((data) => {
        return {reports: data.reports, results: data.results}
    });
}

export async function apiFetchReport(report_id: string): Promise<IReport> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/reports/${report_id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return handleResponse<ReportFetchResponse>(response).then((data) => data.report);
}

export async function apiUpdateReport(report: ReportUpdateRequest): Promise<ReportUpdateResponse> {
    const response = await fetch(
        `${SERVER_ENDPOINT}/api/reports/${report.report.report_id}`,
        {
            method: 'PATCH',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(report)
        }
    );

    return handleResponse<ReportUpdateResponse>(response).then((data) => data);
}

/**
 * VULNERABILITIES
 */
export async function apiFetchVulnerabilities(): Promise<IVulnerability[]> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/vulnerability`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return handleResponse<VulnerabilitiesFetchResponse>(response).then((data) => data.vulnerabilities);
}

/**
 * NOTIFICATION
 */
export async function apiFetchNotifications(): Promise<{notifications: INotification[], nbNotifications: number}> {
    const response = await fetch(`${SERVER_ENDPOINT}/api/notification`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return handleResponse<NotificationFetchResponse>(response).then((data) => {
        return {
            notifications: data.notifications,
            nbNotifications: data.results
        }
    });
}

export async function apiReadNotification(notification_id: number): Promise<void> {
    await fetch(`${SERVER_ENDPOINT}/api/notification/${notification_id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });
}

/**
 * SYNCHRONISATION
 */

export async function apiIsSynchronising(): Promise<SynchronisationResponse> {
    const response = await fetch(
        `${SERVER_ENDPOINT}/api/synchronisation`,
        {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return handleResponse<SynchronisationResponse>(response).then((data) => data);
}

/**
 * STATISTICS
 */

export async function apiGetStatistics(): Promise<StatisticsResponse> {
    const response = await fetch(
        `${SERVER_ENDPOINT}/api/reports/statistics`,
        {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return handleResponse<StatisticsResponse>(response).then((data) => data);
}