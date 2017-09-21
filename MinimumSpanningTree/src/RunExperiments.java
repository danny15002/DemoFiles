/*
  Michael Dey
  CSE6140 HW1
  mdey3
  903116591
*/

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.PriorityQueue;
import java.util.Set;
import java.util.HashSet;
import java.io.IOException;
import java.util.Comparator;

public class RunExperiments {
    public static void main(String[] args) throws IOException {

			if (args.length < 3) {
				System.err.println("Unexpected number of command line arguments");
				System.exit(1);
			}

				String graph_file = args[0];
				String change_file = args[1];
				String output_file = args[2];

				PrintWriter output;
				output = new PrintWriter(output_file, "UTF-8");

				int[][] G = parseEdges(graph_file);

				double startMST = System.nanoTime();
				int MSTweight = computeMST(G);
				double finishMST = System.nanoTime();

				//Subtract the start time from the finish time to get the actual algorithm running time
				double MSTtotal = (finishMST - startMST)/1000000;

				//Write to output file the initial MST weight and time
				output.println(Integer.toString(MSTweight) + " " + Double.toString(MSTtotal));

				BufferedReader br = new BufferedReader(new FileReader(change_file));
				String line = br.readLine();
				String[] split = line.split(" ");
				int num_changes = Integer.parseInt(split[0]);
				int u, v, weight;

				while ((line = br.readLine()) != null) {
					split = line.split(" ");
					u = Integer.parseInt(split[0]);
					v = Integer.parseInt(split[1]);
					weight = Integer.parseInt(split[2]);

          double start_newMST = System.nanoTime();
					int newMST_weight = recomputeMST(u,v,weight,G);
					double finish_newMST = System.nanoTime();

					double newMST_total = (finish_newMST - start_newMST)/1000000;

					//Write new MST weight and time to output file
					output.println(Integer.toString(newMST_weight) + " " + Double.toString(newMST_total));

				}
				output.close();
				br.close();
    }
		public static int[][] parseEdges(String gf) throws IOException {
			//Iterate through graph file

			BufferedReader br = new BufferedReader(new FileReader(gf));
			String line = br.readLine();
			String[] split = line.split(" ");
			int nodes = Integer.parseInt(split[0]);
			int edges = Integer.parseInt(split[1]);
			int[][] g = new int[edges+1][3];
			int k = 1;
			g[0][0] = nodes;
			g[0][1] = edges;

			while ((line = br.readLine()) != null) {
				split = line.split(" ");
				g[k][0] = Integer.parseInt(split[0]); //u
				g[k][1] = Integer.parseInt(split[1]); //v
				g[k][2] = Integer.parseInt(split[2]); //weight
				k++;
			}

			br.close();
			return g;
		}
		public static int computeMST(int[][] G){
      // Compute MST through Prim's Algorithm

			int k;
      int j = 1;
			int[] a = new int[G[0][0]];
			Edge[] e = new Edge[G[0][0]];
      Set<Integer> S = new HashSet<Integer>();

      // PriorityQueue Sorted by Weight
			PriorityQueue<Edge> Q = new PriorityQueue<Edge>(G[0][0], new Comparator<Edge>() {
			    public int compare(Edge e1, Edge e2) {
			        if (e1.getWeight() < e2.getWeight()) return -1;
			        if (e1.getWeight() > e2.getWeight()) return 1;
			        return 0;
			    }
			});

      // PriorityQueue Sorted by u
			PriorityQueue<Edge> mst = new PriorityQueue<Edge>(G[0][0], new Comparator<Edge>() {
			    public int compare(Edge e1, Edge e2) {
			        if (e1.getu() < e2.getu()) return -1;
			        if (e1.getu() > e2.getu()) return 1;
			        return 0;
			    }
			});

      // Initialize edges and weights
      G[0][2] = 0;
			for (int i = 0; i < G[0][0]; i++) {
        a[i] = Integer.MAX_VALUE;
        e[i] = new Edge(0, i, a[i]);
        Q.add(e[i]);
			}

      // Prim's Algorithm
			while (!Q.isEmpty()){
        k = 1;
        int u = Q.poll().getv();
				S.add(u);
        while (k <= G[0][1] && G[k][0] <= u) {
          if (G[k][1] == u && !S.contains(G[k][0]) && G[k][2] < a[G[k][0]] ) {
            a[G[k][0]] = G[k][2];
            Q.remove(e[G[k][0]]);
            e[G[k][0]] = new Edge(G[k][1], G[k][0], a[G[k][0]]);
            Q.add(e[G[k][0]]);
          }
          if(G[k][0] == u && !S.contains(G[k][1]) && G[k][2] < a[G[k][1]] ) {
            a[G[k][1]] = G[k][2];
            Q.remove(e[G[k][1]]);
            e[G[k][1]] = new Edge(G[k][0], G[k][1], a[G[k][1]]);
            Q.add(e[G[k][1]]);
          }
          k++;
        }
        if (!Q.isEmpty()) {
          mst.add(new Edge(Q.peek().getu(), Q.peek().getv(), Q.peek().getWeight()));
          G[0][2] += Q.peek().getWeight();

        }
      }

      // Update Graph Matrix to make MST edges first to compute for
      // recomputeMST. Stores sum into G.
      k = 1;
      while (!mst.isEmpty()) {
        int minNode = Math.min(mst.peek().getu(), mst.peek().getv());
        int maxNode = Math.max(mst.peek().getu(), mst.peek().getv());
        G[k][0] = minNode;
        G[k][1] = maxNode;
        G[k][2] = mst.poll().getWeight();
        k++;
      }

			return G[0][2];

		}
		public static int recomputeMST (int u, int v, int weight, int[][] G){
      // Recomputes MST with new Edge
      int minNode = Math.min(u, v);
      int maxNode = Math.max(u, v);
      int k = G[0][0];
      G[k][0] = k;

      // Creates a new MST PriorityQueue sorted by u
      PriorityQueue<Edge> newMst = new PriorityQueue<Edge>(G[0][0], new Comparator<Edge>() {
          public int compare(Edge e1, Edge e2) {
              if (e1.getu() < e2.getu()) return -1;
              if (e1.getu() > e2.getu()) return 1;
              return 0;
          }
      });

      // re-orders nodes for efficient search in MST
      // Construct newMST
      newMst.add(new Edge(minNode, maxNode, weight));
      for (int i = 1; i < k; i++) {
        newMst.add(new Edge(G[i][0], G[i][1], G[i][2]));
      }

      // Set first n elements to new MST
      G[0][2] = 0;
      for (int i = 1; i < k+1; i++) {
        G[i][0] = newMst.peek().getu();
        G[i][1] = newMst.peek().getv();
        G[i][2] = newMst.poll().getWeight();
      }

      return computeMST(G);

		}
  }
