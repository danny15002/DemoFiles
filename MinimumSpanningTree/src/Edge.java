public class Edge {
  private int u, v, weight;

public Edge(int start, int end, int w){
      u = start;
      v = end;
      weight = w;
  }

  public int getu(){
      return u;
  }

  public int getv(){
      return v;
  }

  public int getWeight(){
      return weight;
  }

}
