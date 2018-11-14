<template>
	<div class="searchOptions">
		<!-- <b-form v-on:submit.prevent="onQuerySubmit"> -->
		<b-card no-body header-tag="header">
			<h2 slot="header" class="mb-6">Search Options</h2>
			<b-card-body>
				<b-form  v-on:submit.prevent="onSubmitQuery">
					<b-card-group>
						<div class="filter-content">
							<b-card-body>
								<div>
									<b-row class="align-middle">
										<b-col md="5">
											<label for="oid">
												<b>Object ID</b>
											</label>
										</b-col>
										<b-col md="7">
											<input type="text" class="form-control disabled" id="oid" v-model="queryParameters.filters.oid">
										</b-col>
									</b-row>
								</div>
								<br>
								<div>
									<b-row class="align-middle">
										<b-col md="5"><label for="class"><b>Class</b></label></b-col>
										<b-col md="7">
											<select class="form-control form-control-sm" id="class" v-model="queryParameters.filters.class">
												<option value="" selected>All</option>
												<option value="1">Star</option>
												<option value="2">Supernova</option>
												<option value="3">Variable Star</option>
											</select>
										</b-col>
									</b-row>
									<b-row class="align-middle">
										<b-col md="5"><label for="subclass"><b>Subclass</b></label></b-col>
										<b-col md="7">
											<select class="form-control form-control-sm" id="subclass" v-model="queryParameters.filters.subclass">
												<option value="" selected>All</option>
												<option value="1">Star</option>
												<option value="2">Supernova</option>
												<option value="3">Variable Star</option>
											</select>
										</b-col>
									</b-row>
								</div>
								<div>
									<br>
									<b>Number of observations</b>
									<b-row class="align-middle">
										<b-col md="6">
											<b-row>
												<b-col md="4" class="text-right">
													<label>Min</label>
												</b-col>
												<b-col md="8" class="text-left">
													<input class="form-control form-control-sm" id="minnobs" type="number" min="0" v-model="queryParameters.filters.nobs.min">
												</b-col>
											</b-row>
										</b-col>
										<b-col md="6">
											<b-row>
												<b-col md="4"  class="text-right">
													<label>Max</label>
												</b-col>
												<b-col md="8" class="text-left">
													<input class="form-control form-control-sm" id="maxnobs" type="number" :min="queryParameters.filters.nobs.min " v-model="queryParameters.filters.nobs.max">
												</b-col>
											</b-row>
										</b-col>
									</b-row>
								</div>
								<div>
									<br>
									<b>Class Probability</b>
									<b-row class="align-middle">
										<b-col md="6">
											<b-row>
												<b-col md="4" class="text-left">
													<label>Min <small class="text-muted">(%)</small></label>
												</b-col>
												<b-col md="8" class="text-left">
													<input class="form-control form-control-sm" id="minpclass" type="number" min="0" v-model="queryParameters.filters.classp.min">
												</b-col>
											</b-row>
										</b-col>
										<b-col md="6">
											<b-row>
												<b-col md="4" class="text-left">
													<label>Max <small class="text-muted">(%)</small></label>
												</b-col>
												<b-col md="8" class="text-left">
													<input class="form-control form-control-sm" id="maxpclass" type="number" :min="queryParameters.filters.classp.min" max="100" v-model="queryParameters.filters.classp.max">
												</b-col>
											</b-row>
										</b-col>
									</b-row>
								</div>

								<div>
									<br>
									<b>Period</b>
									<b-row class="align-middle">
										<b-col md="6">
											<b-row>
												<b-col md="4" class="text-left">
													<label>Min <small class="text-muted">(days)</small></label>
												</b-col>
												<b-col md="8" class="text-left">
													<input class="form-control form-control-sm" id="minperiod" min="0" type="number" v-model.number="queryParameters.filters.period.min">
												</b-col>
											</b-row>
										</b-col>
										<b-col md="6">
											<b-row>
												<b-col md="4" class="text-left">
													<label>Max <small class="text-muted">(days)</small></label>
												</b-col>
												<b-col md="8" class="text-left">
													<input class="form-control form-control-sm" :min="queryParameters.filters.period.min" type="number" id="maxperiod" v-model="queryParameters.filters.period.max">
												</b-col>
											</b-row>
										</b-col>
									</b-row>
								</div>
								<br>
								<b-row class="align-middle" name="ext">
									<b-col md="12" class="form-check">
										<b-form-group>
											<b-form-checkbox plain stacked id="ext" v-model="queryParameters.filters.ext" value="1" :unchecked-value="null">Has Crossmatch</b-form-checkbox>
										</b-form-group>
										<!-- <input type="checkbox" class="form-check-input" id="ext">
										<label class="form-check-label" for="ext">Has Crossmatch</label> -->
									</b-col>
								</b-row>
							</b-card-body>
						</div>
					</b-card-group>
					<div class="text-center">
						<b-btn variant="outline-secondary" v-b-toggle="'AdvancedSearch'">
							More Options
						</b-btn>
					</div>
					<b-card-group>
						<b-collapse id="AdvancedSearch">
							<div name="bands">
								<b-card-body>
									<br>
									<h3>Magnitude</h3>
									<b-form-group>
										<div class="checkbox">
											<b-form-group>
												<b-form-checkbox
												plain
												stacked
												id="anyBand"
												v-on:click="anyBand = !anyBand"
												v-model="anyBand">
												Any band
											</b-form-checkbox>
										</b-form-group>
									</div>
								</b-form-group>

								<transition name="fade">
									<b-card no-body id="magnitudTab">

										<b-tabs card v-show="anyBand">
											<b-tab>
												<template slot="title">
													<strong>Any Band</strong>
												</template>
												<tabBand :band="queryParameters.bands.any"></tabBand>
											</b-tab>
										</b-tabs>

										<b-tabs card v-show="!anyBand">

											<!-- #### U TAB #### -->

											<b-tab title="u" disabled>
												<tabBand :band="queryParameters.bands.u"></tabBand>
											</b-tab>

											<!-- #### END U TAB #### -->

											<!-- #### G TAB #### -->

											<b-tab title="g" active>
												<tabBand :band="queryParameters.bands.g"></tabBand>
											</b-tab>

											<!-- #### END G TAB #### -->

											<!-- #### R TAB #### -->

											<b-tab title="r">
												<tabBand :band="queryParameters.bands.r"></tabBand>
											</b-tab>
											<!-- #### END R TAB #### -->

											<!-- #### I TAB #### -->

											<b-tab title="i" disabled>
												<tabBand :band="queryParameters.bands.i"></tabBand>
											</b-tab>
											<!-- #### END I TAB #### -->

											<!-- #### Z TAB #### -->

											<b-tab title="z" disabled>
												<tabBand :band="queryParameters.bands.z"></tabBand>
											</b-tab>
											<!-- #### END Z TAB #### -->

											<!-- #### Y TAB #### -->

											<b-tab title="y" disabled>
												<tabBand :band="queryParameters.bands.y"></tabBand>
											</b-tab>
											<!-- #### END Y TAB #### -->
										</b-tabs>
									</b-card>
								</transition>
							</b-card-body>
						</div>
						<div name="dates">
							<b-card-body>
								<br>
								<h2>Dates</h2>
								<b-card>
									<b-row class="align-middle" name="JD">
										<b-col>
											<p class="small">MJD</p>
										</b-col>
										<b-col>
											<p class="small">Date</p>
										</b-col>
									</b-row>
									<b-row class="align-middle">
										<b-col>
											<label>First alert</label>
										</b-col>
									</b-row>
									<b-row class="align-middle" name="firstJD">
										<b-col>
											<b-form-input size="sm" id="firstjd" v-model="queryParameters.dates.firstjd" @change="jdToGregorian(queryParameters.dates.firstjd, 'first')"></b-form-input>
										</b-col>
										<b-col>
											<b-form-input size="sm" id="datepickerfirst" name="firstJD" type="date" v-model="firstGreg"></b-form-input>
										</b-col>
									</b-row>
									<br>
									<b-row class="align-middle">
										<b-col>
											<label>Last alert</label>
										</b-col>
									</b-row>
									<b-row class="align-middle" name="lastJD">
										<b-col>
											<b-form-input size="sm" id="lastjd" v-model="queryParameters.dates.lastjd"></b-form-input>
										</b-col>
										<b-col>
											<b-form-input size="sm" id="datepickerlast" name="lastJD" type="date" v-model="lastGreg"></b-form-input>
										</b-col>

									</b-row>
									<br>
									<b-row class="align-middle">
										<b-col md="4" class="text-center small">min</b-col>
										<b-col md="4" class="text-center"></b-col>
										<b-col md="4" class="text-center small">max</b-col>
									</b-row>
									<b-row class="align-middle">
										<b-col md="4">
											<b-form-input size="sm" id="minjd"></b-form-input>
										</b-col>
										<b-col md="4" class="text-center">delta <small class="text-muted">(days)</small></b-col>
										<b-col md="4">
											<b-form-input size="sm" id="maxjd"></b-form-input>
										</b-col>
									</b-row>
								</b-card>
							</b-card-body>
						</div>
						<div name="coordinates">
							<b-card-body>
								<br>
								<h2>Coordinates</h2>
								<b-card no-body>
									<b-tabs card>
										<b-tab title="Single">
											<b-container>
												<b-row class="align-middle">
													<b-col md="6">RA <small class="text-muted">(deg)</small></b-col>
													<b-col md="6">
														<b-form-input size="sm" id="RA"></b-form-input>
													</b-col>
												</b-row>
												<b-row class="align-middle">
													<b-col md="6">DEC <small class="text-muted">(deg)</small></b-col>
													<b-col md="6">
														<b-form-input size="sm" id="DEC"></b-form-input>
													</b-col>
												</b-row>
												<b-row class="align-middle">
													<b-col md="6">RS <small class="text-muted">(deg)</small></b-col>
													<b-col md="6">
														<b-form-input size="sm" id="RS"></b-form-input>
													</b-col>
												</b-row>
											</b-container>
										</b-tab>
										<b-tab title="List">
											<b-container>
												<b-row class="align-middle">
													<b-form-file placeholder="Choose a file..."></b-form-file>
													<b-alert show class="small">.txt file, format: "RA,DEC,RS\n"</b-alert>
												</b-row>
											</b-container>
										</b-tab>
									</b-tabs>
								</b-card>
							</b-card-body>
						</div>
					</b-collapse>
				</b-card-group>
			</br>
			<b-card-group>
				<b-container>
					<b-row class="text-center">
						<b-col>
							<b-button variant="outline-secondary" v-b-toggle="'SQL'">
								Show SQL
							</b-button>
						</b-col>
					</b-row>
					<b-collapse id="SQL">
						<br>
						<b-jumbotron>
							<pre><code>{{currentQuery}}</code></pre>
						</b-jumbotron>
					</b-collapse>
					<br>
					<b-row class="text-center">
						<b-col>
							<b-button type="submit" variant="primary" size="lg" block id="searchbtn">
								SEARCH
							</b-button>
						</b-col>
					</b-row>
					<br>
					<b-row>
						<b-col class="text-center">
							<b-button variant="secondary" size="sm" id="searchbtn"> <!-- data-target="#saveSearchModal" -->
								Save search
							</b-button>
						</b-col>
						<b-col class="text-center">
							<b-button variant="warning" size="sm"> <!-- data-target="#subscribeModal" -->
								Subscribe
							</b-button>
						</b-col>
					</b-row>
				</b-container>
			</b-card-group>
		</b-form>
	</b-card-body>
</b-card>
<!-- </b-form> -->
</div>
</template>


<script>
import tabBand from './tabBand.vue'
export default {
	name: 'searchtOptions',
	props: ['params'],
	components: {
		tabBand,
	},
	data(){
		return{
			currentQuery: "SELECT * FROM TABLE",
			flagFirst:false,
			flagLast:false,
			anyBand: false,
			firstGreg: null,
			lastGreg: null,
			queryParameters: {
				filters:{
					oid: null,
					class: null,
					subclass: null,
					nobs:{
						min: null,
						max: null,
					},
					classp:{
						min: null,
						max: null
					},
					period:{
						min:null,
						max:null
					},
					ext: null,
				},
				dates:{
					firstjd: null,
					lastjd: null,
					deltajd: {
						min: null,
						max: null,
					}
				},
				bands:{
					any: {
						min: null,
						max: null,
						slope: {
							min: null,
							max: null,
						},
						mean: {
							min: null,
							max: null,
						},
						rms: {
							min: null,
							max: null,
						},
						lastmag: {
							min: null,
							max: null,
						}
					},
					u: {
						min: null,
						max: null,
						slope: {
							min: null,
							max: null,
						},
						mean: {
							min: null,
							max: null,
						},
						rms: {
							min: null,
							max: null,
						},
						lastmag: {
							min: null,
							max: null,
						}
					},
					g: {
						min: null,
						max: null,
						slope: {
							min: null,
							max: null,
						},
						mean: {
							min: null,
							max: null,
						},
						rms: {
							min: null,
							max: null,
						},
						lastmag: {
							min: null,
							max: null,
						}
					},
					r: {
						min: null,
						max: null,
						slope: {
							min: null,
							max: null,
						},
						mean: {
							min: null,
							max: null,
						},
						rms: {
							min: null,
							max: null,
						},
						lastmag: {
							min: null,
							max: null,
						}
					},
					i: {
						min: null,
						max: null,
						slope: {
							min: null,
							max: null,
						},
						mean: {
							min: null,
							max: null,
						},
						rms: {
							min: null,
							max: null,
						},
						lastmag: {
							min: null,
							max: null,
						}
					},
					z: {
						min: null,
						max: null,
						slope: {
							min: null,
							max: null,
						},
						mean: {
							min: null,
							max: null,
						},
						rms: {
							min: null,
							max: null,
						},
						lastmag: {
							min: null,
							max: null,
						}
					},
					y: {
						min: null,
						max: null,
						slope: {
							min: null,
							max: null,
						},
						mean: {
							min: null,
							max: null,
						},
						rms: {
							min: null,
							max: null,
						},
						lastmag: {
							min: null,
							max: null,
						}
					},
				}
			},
		}
	},
	computed:{
		firstjd(){
			return this.queryParameters.dates.firstjd
		},
		lastjd(){
			return this.queryParameters.dates.lastjd
		}
	},
	watch:{
		queryParameters: {
			handler: function(newVal, oldVal) {
				let queryToSubmit = this._.cloneDeep(newVal);
				this.removeEmpty(queryToSubmit);
	            this.$http.post('/v1/get_sql',{
	                query_parameters: queryToSubmit
	            })
	            .then((result_query) => {
	                this.currentQuery = result_query.data;
	            })
			},
			deep: true
		},
		firstGreg: function(newGreg){
			if(!this.flagFirst) {
				this.flagFirst = true;
				this.queryParameters.dates.firstjd = this.gregorianToJd(newGreg);
			} else {
				this.flagFirst = false;
			}

		},
		lastGreg: function(newGreg){
			if(!this.flagLast) {
				this.flagLast = true;
				this.queryParameters.dates.lastjd = this.gregorianToJd(newGreg);
			} else {
				this.flagLast = false;
			}
		},
		firstjd(){
			if(!this.flagFirst) {
				this.flagFirst = true;
				this.firstGreg = this.jdToGregorian(this.queryParameters.dates.firstjd);
			} else {
				this.flagFirst = false;
			}
		},
		lastjd(val){
			if(!this.flagLast) {
				this.flagLast = true;
				this.lastGreg = this.jdToGregorian(this.queryParameters.dates.lastjd);
			} else {
				this.flagLast = false;
			}
		}

	},
	methods : {
		jdToGregorian(JD){
			const y = 4716;
			const v = 3;
			const j = 1401;
			const u =  5;
			const m =  2;
			const s =  153;
			const n = 12;
			const w =  2;
			const r =  4;
			const B =  274277;
			const p =  1461;
			const C =  -38;
			var f = JD*1.0 + j + Math.floor((Math.floor((4 * JD*1.0 + B) / 146097) * 3) / 4) + C;
			var e = r * f + v;
			var g = Math.floor((e % p) / r);
			var h = u * g + w;
			var D = Math.floor((h % s) / u) + 1;
			var M = ((Math.floor(h / s) + m) % n) + 1;
			var Y = Math.floor(e / p) - y + Math.floor((n + m - M) / n) ;

			var day = ("0" + D).slice(-2);
			var month = ("0" + M ).slice(-2);
			var year = ("000" + Y ).slice(-4);


			var today = year + "-" + month + "-" + day;
			return today;
		},
		gregorianToJd(gDate){
			var dateObj = new Date(gDate);
			var julianDate = dateObj / 86400000 + 2440587.5;
			return julianDate;
		},

		toggleAnyBand(){
			this.anyBand = !this.anyBand;
		},
		removeEmpty(obj){
			Object.entries(obj).forEach(([key, val]) => {
				if (val && typeof val === 'object'){
					this.removeEmpty(val);
					if (Object.keys(val).length === 0) delete obj[key];
				}
				else if (val == null || val == "") delete obj[key]
			})
		},
		onSubmitQuery(){
			let queryToSubmit = this._.cloneDeep(this.queryParameters);
			console.log(queryToSubmit);
			this.removeEmpty(queryToSubmit);
			this.$emit("update:params",queryToSubmit);

		},


	},
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
	transition: opacity 2.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	transition: opacity 2.5s;
}
</style>
