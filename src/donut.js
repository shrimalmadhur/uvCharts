r3.donutgraph = function (graphdef) {
	r3.graph.apply(this, [graphdef]);
	this.init(graphdef);

	this.outerRadius = Math.min(this.dimension.height, this.dimension.width)*2/5;
	this.innerRadius = this.outerRadius * 0.4;
	this.center = {
		x : this.dimension.width/2,
		y : this.dimension.height/2
	}

	this.category = graphdef.categories[0];
	this.data = r3.util.getCategoryData(this.graphdef, [this.category]);

	color = d3.scale.category10();

	this.layout = d3.layout.pie();
	this.arcfunc = d3.svg.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius);

	this.panel.data(this.data);

	this.arcs = this.panel.selectAll('g.arc')
					.data(this.layout).enter()
					.append('g').attr('class','arc')
					.attr('transform', 'translate(' + this.center.x + ',' + this.center.y + ')');

	var arc = this.arcfunc, center = this.center;
	this.arcs.append('path')
	    .attr('fill', function(d, i) { return color(i); })
	    .attr('d', this.arcfunc)
		.on('mouseover', function(d, i){
			var dev = {}; dev.x = arc.centroid(d)[0]/4; dev.y = arc.centroid(d)[1]/4;
			d3.select(this.parentNode)
				.attr('transform', 'translate(' + (center.x + dev.x) + ',' + (center.y + dev.y) + ')'); 
		})
		.on('mouseout', function(){
			d3.select(this.parentNode).attr('transform', 'translate(' + center.x + ',' + center.y + ')');
		});
	
	this.arcs.append('text')
	    .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
	    .attr('dy', '.35em')
	    .attr('text-anchor', 'middle')
	    .attr('display', function(d) { return d.value > .15 ? null : 'none'; })
	    .text(function(d, i) { return d.value; });

	console.log(this);
};

r3.donutgraph.prototype = r3.util.extend(r3.graph);