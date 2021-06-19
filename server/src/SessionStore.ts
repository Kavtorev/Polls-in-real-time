// TODO implement an interface for the session object;

export default class SessionStore {
  sessions: Map<string, any>;

  constructor() {
    this.sessions = new Map();
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
