import Server from './server';

class NGWordSearch {
  private server: Server;

  constructor() {
    this.server = new Server();
  }

  public run() {
    this.server.start();
  }
}

const ngWordSearch: NGWordSearch = new NGWordSearch();

ngWordSearch.run();
