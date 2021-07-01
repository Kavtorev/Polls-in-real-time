// TODO implement an interface for the session object;

export default class SessionStore {
  sessions: Map<string, any>;
  static readonly limit: number = 3;

  constructor() {
    this.sessions = new Map();
  }

  summarizeSession(id: string) {
    let session = this.sessions.get(id);
    if (session) {
      session.meta.isSummarized = true;
      return this.sessions.set(id, session).get(id);
    }
  }

  getSessionById(id: string) {
    return this.sessions.get(id);
  }

  getSessions() {
    return this.sessions.entries();
  }

  removeSession(id: string) {
    return this.sessions.delete(id);
  }

  createSession(id: string, session: any) {
    this.sessions.set(id, session);
  }

  isLimitExceeded(userID: string) {
    let sessionIdentifiers = [];
    for (let key of this.sessions.keys()) {
      if (this.sessions.get(key).meta.pollCreator === userID) {
        sessionIdentifiers.push(key);
      }
    }
    return [
      sessionIdentifiers,
      sessionIdentifiers.length + 1 > SessionStore.limit,
    ];
  }
}
