/**
 * SENSITIVE_KEYS: List of keys to be masked in logs for security.
 */
const SENSITIVE_KEYS = [
  'password',
  'token',
  'access_token',
  'secret',
  'cvv',
  'pin',
  'apphash',
  'Authorization',
  'senha',
];

/**
 * Sanitizes objects or strings, masking sensitive data.
 */
const sanitize = (data: any): any => {
  if (!data) return data;

  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return JSON.stringify(sanitize(parsed));
    } catch {
      return data;
    }
  }

  if (typeof data === 'object') {
    const cleanData = Array.isArray(data) ? [...data] : { ...data };
    for (const key in cleanData) {
      if (SENSITIVE_KEYS.some((s) => key.toLowerCase().includes(s.toLowerCase()))) {
        cleanData[key] = '[SENSITIVE_DATA]';
      } else if (typeof cleanData[key] === 'object') {
        cleanData[key] = sanitize(cleanData[key]);
      }
    }
    return cleanData;
  }

  return data;
};

/**
 * Layout helper for styled logs.
 */
const printLayout = (icon: string, context: string, content: any) => {
  const line = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
  console.log(
    `\n${icon} [ ${context} ] ${line.slice(0, Math.max(0, line.length - context.length - 10))}`,
  );

  if (typeof content === 'object' && content !== null) {
    const sanitized = sanitize(content);
    Object.entries(sanitized).forEach(([key, value]) => {
      const label = key.toUpperCase();
      if (typeof value === 'object' && value !== null) {
        console.log(`${label}: ${JSON.stringify(value, null, 2)}`);
      } else {
        console.log(`${label}: ${value}`);
      }
    });
  } else {
    console.log(sanitize(content));
  }

  console.log(`${line}\n`);
};

/**
 * Smart Logger for Errors.
 * Automatically detects if it's an Axios error or a native Error.
 */
export const logError = (context: string, error: any) => {
  // Silence in production
  if (!__DEV__) {
    // In a real app, you would call your remote logging service here
    // logRemote(context, error);
    return;
  }

  const isAxiosError = error?.response || error?.config;

  if (isAxiosError) {
    const status = error.response?.status || 'NETWORK_ERROR';
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN';
    const url = error.config?.url || 'UNKNOWN URL';

    const axiosContent = {
      '🌐 URL': url,
      '🛠️  METHOD': method,
      STATUS: status,
      '📦 RESPONSE': error.response?.data || 'No response data',
      PARAMS: error.config?.params,
      HEADERS: error.config?.headers,
    };

    printLayout('❌', `API ERROR > ${context}`, axiosContent);
  } else {
    printLayout('❌', `NATIVE ERROR > ${context}`, {
      message: error?.message || String(error),
      stack: error?.stack,
      raw: error,
    });
  }
};

/**
 * Safe replacement for console.log during development.
 */
export const logDebug = (context: string, message: string, data?: any) => {
  if (!__DEV__) return;

  const timestamp = new Date().toLocaleTimeString();

  printLayout('🔍', `DEBUG > ${context}`, {
    '🕒': timestamp,
    '📝 MENSAGEM': message,
    '📦 DADOS': data ? sanitize(data) : undefined,
  });
};

/**
 * Log for Developer Tests
 */
export const logTest = (data?: any) => {
  if (!__DEV__) return;

  printLayout('ℹ️', `TESTE: \n`, data);
};
