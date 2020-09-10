import React,{useEffect,useState} from 'react';
import * as d3 from "d3";
import * as venn from "venn.js";
import './App.css'


var path,div

var colors=[
  '#fe4a49',
  '#2ab7ca',
  '#fed766',
  '#0090ff',
  '#888888',
  '#c99789',
  '#536872',
  '#4b3832',
  '#0090ff'
]

var schema=[false,false,false,false,false,false,false,false,false]
var isWhite=[false,false,false,false,false,false,false,false,false]

function App() {

  const [sets, setSets] = useState([
        {sets: ['A'], size: 12,label:'ক',log:'ক',id:0},
       {sets: ['B'], size: 12,label:'খ',log:'খ',id:1},
       {sets: ['C'], size: 12,label:'গ',log:'গ',id:2},
       {sets: ['D'], size: 12,label:'ঘ',log:'ঘ',id:3},
       {sets: ['A','B'], size: 2,log:'ক+খ',id:4},
       {sets: ['A','C'], size: 2,log:'ক+গ',id:5},
      {sets: ['B','D'], size: 2,log:'খ+ঘ',id:6},
       {sets: ['C','B'], size: 2,log:'খ+গ',id:7},
       {sets: ['A','B','C'], size: 2,log:'ক+খ+গ',id:8}
  ]);


  const [select,setSelect]=useState([
      [[0],[4,5]],
      [[1],[4,6,7]],
      [[2],[5,7]],
      [[3],[6]],
      [[4],[8]],
      [[5],[8]],
      [[6],[]],
      [[7],[8]],
      [[8],[]]
  ])

  useEffect(() => {
    var chart = venn.VennDiagram({
      colorScheme: ['#00ff00', '#F26250','#F26250'],
      textFill: '#FFF',
    });
    div = d3.select("#venn")
    div.datum(sets).call(chart);

    var tooltip = d3.select("body").append("div")
    .attr("class", "venntooltip");



    div.selectAll('g').on('mouseover',function(d,i){
      for(var indAdd in select[i.id][0]){
        var indAddTmp=select[i.id][0][indAdd]
        div.selectAll('g').each(function(d1,i1){
          //console.log(d1)
          if(indAddTmp==d1.id){
            var node = d3.select(this).transition();
            node.select("path")
             .style('fill',colors[d1.id])
             .style('fill-opacity',1)
             .style('cursor','pointer')
          }
        })
      }
      for(var indDed in select[i.id][1]){
        var indDedTmp=select[i.id][1][indDed]
        //if(!schema[indDed])
        div.selectAll('g').each(function(d1,i1){
          //console.log(d1)
          if(indDedTmp==d1.id && !schema[indDedTmp]){
            var node = d3.select(this).transition();
            node.select("path")
             .style('fill','#ffffff')
             .style('fill-opacity',1)
             .style('cursor','pointer')
          }
        })
      }

    })

    div.selectAll('g').on('click',function(d,i){
    //  if(i.id==0){


        if(!schema[i.id]){
          for(var indAdd in select[i.id][0]){
            var indAddTmp=select[i.id][0][indAdd]
            div.selectAll('g').each(function(d1,i1){
              //console.log(d1)
              if(indAddTmp==d1.id){
                var node = d3.select(this).transition();
                node.select("path")
                 .style('fill',colors[d1.id])
                 .style('fill-opacity',1)
                 .style('cursor','pointer')
              }
            })
          }
          for(var indDed in select[i.id][1]){
            var indDedTmp=select[i.id][1][indDed]
            //if(!schema[indDed])
            div.selectAll('g').each(function(d1,i1){
              //console.log(d1)
              if(indDedTmp==d1.id && !schema[indDedTmp]){
                var node = d3.select(this).transition();
                node.select("path")
                 .style('fill','#ffffff')
                 .style('fill-opacity',1)
                 .style('cursor','pointer')
              }
            })
          }
        }else{
          for(var indAdd in select[i.id][0]){
            var indAddTmp=select[i.id][0][indAdd]
            div.selectAll('g').each(function(d1,i1){
              //console.log(d1)
              if(indAddTmp==d1.id){
                var node = d3.select(this).transition();
                node.select("path")
                 .style('fill','#ffffff')
                 .style('fill-opacity',1)
                 .style('cursor','pointer')
              }
            })
          }
        }
        schema[i.id]=!schema[i.id]
        console.log(schema)
    })

    div.selectAll('g').on('mouseout',function(d,i){
      if(!schema[i.id]){
        for(var indAdd in select[i.id][0]){
          var indAddTmp=select[i.id][0][indAdd]
          div.selectAll('g').each(function(d1,i1){
            //console.log(d1)
            if(indAddTmp==d1.id){
              var node = d3.select(this).transition();
              node.select("path")
               .style('fill','#ffffff')
               .style('fill-opacity',1)
               .style('cursor','pointer')
            }
          })
        }
      }

    })


    d3.selectAll("#venn text")
               .style("fill", 'black')
               .style('fill-opacity',1)
               .style('font-size','1.6em')

   d3.selectAll("#venn path")
    .style("stroke-opacity", 1)
    .style("stroke", "#000000")
    .style("stroke-width", 2)
    .style('fill','#ffffff')
    .style('fill-opacity',0)




  }, [sets]);

  return (
    <div className='noSelect' id="venn">
    </div>
  );
}

export default App;
