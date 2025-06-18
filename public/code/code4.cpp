#include<bits/stdc++.h>
using namespace std;
typedef pair<int,int> pii;
#define ls first
#define rs second
int main(){
    int n;cin>>n;
    vector<int> in(n),pre(n),ans;
    map<int,int> mp;
    map<int,pii> son;
    for(int i=0; i<n; i++)cin>>in[i],mp[in[i]]=i;
    for(auto &i:pre)cin>>i;
    function<void(int,int,int,int)> dfs=[&](int pl, int pr, int il, int ir){
        if(pl>pr||il>ir)return ;
        int root=pre[pl];
        int rootIndex=mp[root];
        int  leftsize=rootIndex-il;
        if(mp[root]!=il){
            son[root].ls=pre[pl+1];
            dfs(pl+1, pl+leftsize, il, rootIndex-1);
        }
        if(mp[root]!=ir){
            son[root].rs=pre[pl+leftsize+1];
            dfs(pl+leftsize+1, pr, rootIndex+1, ir);
        }
    };
    dfs(0, n-1, 0, n-1);
    for(auto &[x,y]:son){
        auto &[a,b]=y;
        swap(a,b);
    }
    auto bfs=[&](int x){
        queue<int> q;
        q.push(x);
        while(q.size()){
            int t=q.front();
            q.pop();
            ans.push_back(t);
            if(son[t].ls)q.push(son[t].ls);
            if(son[t].rs)q.push(son[t].rs);
        }
    };
    bfs(pre[0]);
    for(int i=0; i<n; i++)cout<<ans[i]<<" \n"[i==n-1];
    return 0;
}