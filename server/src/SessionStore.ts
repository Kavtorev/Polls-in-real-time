// TODO implement an interface for the session object;

export default class SessionStore {
  sessions: Map<string, any>;

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

  createSession(id: string, session: any) {
    this.sessions.set(id, session);
  }
}
