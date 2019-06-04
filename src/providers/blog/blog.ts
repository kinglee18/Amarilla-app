import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class BlogProvider {
  public categories = [
    {
      slug: "emprendedores",
      elasticsName: "emprendedores",
      title: "Tu negocio",
      imgPrefixName: "emprendedores"
    },
    {
      slug: "como-cuidarse",
      elasticsName: "¿como cuidarse?",
      title: "¿Cómo cuidarse?",
      imgPrefixName: "emprendedores"
      /* imgPrefixName: "cuidarse" */
    },
    {
      slug: "que-comer",
      elasticsName: "¿que comer?",
      title: "¿Qué comer?",
      imgPrefixName: "emprendedores"
      /* imgPrefixName: "comer" */
    },
    {
      slug: "quehacer",
      elasticsName: "¿que hacer?",
      title: "¿Qué hacer?",
      imgPrefixName: "emprendedores"
      /* imgPrefixName: "hacer" */
    }
  ];

  constructor(private http: HttpClient) {

  }

  getByCategory(category, size = 1, from = 0): Promise<any> {
    let item = this.searchCategoryBySlugName(category);
    let body = {
      from,
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
                      "categories.title": item["elasticsName"]
                    }
                  }
                ]
              }
            }
          }
        }
      }
    };
    return this.http.post("https://engine.aceleradordigitaldenegocios.com.mx/blog", body).toPromise();
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
