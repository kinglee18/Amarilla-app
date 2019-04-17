import { Injectable } from "@angular/core";
import { Client } from "elasticsearch-browser";

@Injectable()
export class BlogProvider {
  private client: Client;
  public categories = [
    {
      slug: "emprendedores",
      elasticsName: "emprendedores",
      title: "Tu negocio",
      img: ""
    },
    {
      slug: "como-cuidarse",
      elasticsName: "¿como cuidarse?",
      title: "¿Cómo cuidarse?",
      img: ""
    },
    {
      slug: "que-comer",
      elasticsName: "¿que comer?",
      title: "¿Qué comer?",
      img: ""
    },
    {
      slug: "quehacer",
      elasticsName: "¿que hacer?",
      title: "¿Qué hacer?",
      img: ""
    }
  ];
  constructor() {
    if (!this.client) {
      this._connect();
    }
  }

  private _connect() {
    this.client = new Client({
      host: "10.34.180.126:9200"
    });
  }

  getByCategory(category, size = 1): Promise<any> {
    let item = this.searchCategoryBySlugName(category);
    return this.client.search({
      index: "blog_rep",
      body: {
        size,
        sort: [{ date: { order: "desc" } }],
        query: {
          nested: {
            path: "categories",
            query: {
              bool: {
                must: [
                  {
                    match: {
                      "categories.title": item['elasticsName']
                    }
                  }
                ]
              }
            }
          }
        }
      }
    });
  }

  getHomeArticles() {
    const request: Array<Promise<any>> = [];
    this.categories.forEach(item => {
      request.push(this.getByCategory(item.slug));
    });
    return Promise.all(request);
  }

  searchCategoryBySlugName(name: string): object {
    let index = this.categories
      .map(e => {
        return e.slug;
      })
      .indexOf(name);
    return this.categories[index];
  }
}
