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
											<input type="text" class="form-control disabled" id="oid" v-model="queryParameters.oid">
										</b-col>
									</b-row>
								</div>
								<br>
								<div>
									<b-row class="align-middle">
										<b-col md="5"><label for="class"><b>Class</b></label></b-col>
										<b-col md="7">
											<select class="form-control form-control-sm" id="class" v-model="queryParameters.class">
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
											<select class="form-control form-control-sm" id="subclass" v-model="queryParameters.subclass">
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
													<input class="form-control form-control-sm" id="minnobs" v-model="queryParameters.nobs.min">
												</b-col>
											</b-row>
										</b-col>
										<b-col md="6">
											<b-row>
												<b-col md="4"  class="text-right">
													<label>Max</label>
												</b-col>
												<b-col md="8" class="text-left">
													<input class="form-control form-control-sm" id="maxnobs" v-model="queryParameters.nobs.max">
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
													<input class="form-control form-control-sm" id="minpclass" v-model="queryParameters.classp.min">
												</b-col>
											</b-row>
										</b-col>
										<b-col md="6">
											<b-row>
												<b-col md="4" class="text-left">
													<label>Max <small class="text-muted">(%)</small></label>
												</b-col>
												<b-col md="8" class="text-left">
													<input class="form-control form-control-sm" id="maxpclass" v-model="queryParameters.classp.max">
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
													<input class="form-control form-control-sm" id="minperiod" v-model="queryParameters.period.min">
												</b-col>
											</b-row>
										</b-col>
										<b-col md="6">
											<b-row>
												<b-col md="4" class="text-left">
													<label>Max <small class="text-muted">(days)</small></label>
												</b-col>
												<b-col md="8" class="text-left">
													<input class="form-control form-control-sm" id="maxperiod" v-model="queryParameters.period.max">
												</b-col>
											</b-row>
										</b-col>
									</b-row>
								</div>
								<br>
								<b-row class="align-middle" name="ext">
									<b-col md="12" class="form-check">
										<b-form-group>
											<b-form-checkbox plain stacked id="ext" v-model="queryParameters.ext">Has Crossmatch</b-form-checkbox>
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
													<b-row class="align-middle">
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="minAny">Min</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="minAny"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="maxAny">Max</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="maxAny"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
													<hr>
													<b-row class="align-middle">
														<b-col md="4" class="text-center small">min</b-col>
														<b-col md="4" class="text-center"> </b-col>
														<b-col md="4" class="text-center small">max</b-col>
													</b-row>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minSlopeAny"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> slope </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxSlopeAny"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minMeanAny"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> mean </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxMeanAny"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<div class="row align-middle">
														<div class="col-4">
															<b-form-input size="sm" id="minRmsAny"></b-form-input>
														</div>
														<div class="col-4 text-center"> RMS </div>
														<div class="col-4">
															<b-form-input size="sm" id="maxRmsAny"></b-form-input>
														</div>
													</div>

													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minLastmagU"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> last magn. </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxLastmagU"></b-form-input>
														</b-col>
													</b-row>
												</b-tab>
											</b-tabs>

											<b-tabs card v-show="!anyBand">

												<!-- #### U TAB #### -->

												<b-tab title="u" disabled>
													<b-row class="align-middle">
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="minU">Min</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="minU"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="maxU">Max</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="maxU"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
													<hr>
													<b-row class="align-middle">
														<b-col md="4" class="text-center small">min</b-col>
														<b-col md="4" class="text-center"> </b-col>
														<b-col md="4" class="text-center small">max</b-col>
													</b-row>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minSlopeU"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> slope </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxSlopeU"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minMeanU"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> mean </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxMeanU"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minRmsU"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> RMS </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxRmsU"></b-form-input>
														</b-col>
													</b-row>

													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minLastmagU"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> last magn. </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxLastmagU"></b-form-input>
														</b-col>
													</b-row>
												</b-tab>

												<!-- #### END U TAB #### -->

												<!-- #### G TAB #### -->

												<b-tab title="g" active>
													<b-row class="align-middle">
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="minG">Min</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="minG"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="maxG">Max</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="maxG"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
													<hr>
													<b-row class="align-middle">
														<b-col md="4" class="text-center small">min</b-col>
														<b-col md="4" class="text-center"> </b-col>
														<b-col md="4" class="text-center small">max</b-col>
													</b-row>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minSlopeG"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> slope </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxSlopeG"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minMeanG"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> mean </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxMeanG"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minRmsG"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> RMS </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxRmsG"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minLastmagG"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> last magn. </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxLastmagG"></b-form-input>
														</b-col>
													</b-row>
												</b-tab>

												<!-- #### END G TAB #### -->

												<!-- #### R TAB #### -->

												<b-tab title="r">
													<b-row class="align-middle">
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="minR">Min</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="minR"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="maxR">Max</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="maxR"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
													<hr>
													<b-row class="align-middle">
														<b-col md="4" class="text-center small">min</b-col>
														<b-col md="4" class="text-center"> </b-col>
														<b-col md="4" class="text-center small">max</b-col>
													</b-row>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minSlopeR"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> slope </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxSlopeR"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minMeanR"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> mean </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxMeanR"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minRmsR"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> RMS </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxRmsR"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minLastmagR"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> last magn. </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxLastmagR"></b-form-input>
														</b-col>
													</b-row>
												</b-tab>
												<!-- #### END R TAB #### -->

												<!-- #### I TAB #### -->

												<b-tab title="i" disabled>
													<b-row class="align-middle">
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="minI">Min</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="minI"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="maxI">Max</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="maxI"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
													<hr>
													<b-row class="align-middle">
														<b-col md="4" class="text-center small">min</b-col>
														<b-col md="4" class="text-center"> </b-col>
														<b-col md="4" class="text-center small">max</b-col>
													</b-row>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minSlopeI"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> slope </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxSlopeI"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minMeanI"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> mean </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxMeanI"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minRmsI"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> RMS </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxRmsI"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minLastmagI"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> last magn. </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxLastmagI"></b-form-input>
														</b-col>
													</b-row>
												</b-tab>
												<!-- #### END I TAB #### -->

												<!-- #### Z TAB #### -->

												<b-tab title="z" disabled>
													<b-row class="align-middle">
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="minZ">Min</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="minZ"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="maxZ">Max</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="maxZ"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
													<hr>
													<b-row class="align-middle">
														<b-col md="4" class="text-center small">min</b-col>
														<b-col md="4" class="text-center"> </b-col>
														<b-col md="4" class="text-center small">max</b-col>
													</b-row>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minSlopeZ"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> slope </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxSlopeZ"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minMeanZ"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> mean </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxMeanZ"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minRmsZ"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> RMS </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxRmsZ"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minLastmagZ"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> last magn. </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxLastmagZ"></b-form-input>
														</b-col>
													</b-row>
												</b-tab>
												<!-- #### END Z TAB #### -->

												<!-- #### Y TAB #### -->

												<b-tab title="y" disabled>
													<b-row class="align-middle">
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="minY">Min</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="minY"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
														<b-col md="6">
															<b-row>
																<b-col md="4" class="text-right">
																	<label for="maxY">Max</label>
																</b-col>
																<b-col md="8" class="text-left">
																	<b-form-input size="sm" id="maxY"></b-form-input>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
													<hr>
													<b-row class="align-middle">
														<b-col md="4" class="text-center small">min</b-col>
														<b-col md="4" class="text-center"> </b-col>
														<b-col md="4" class="text-center small">max</b-col>
													</b-row>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minSlopeY"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> slope </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxSlopeY"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minMeanY"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> mean </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxMeanY"></b-form-input>
														</b-col>
													</b-row>
													<br>
													<div class="row align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minRmsY"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> RMS </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxRmsY"></b-form-input>
														</b-col>
													</div>
													<br>
													<b-row class="align-middle">
														<b-col md="4">
															<b-form-input size="sm" id="minLastmagY"></b-form-input>
														</b-col>
														<b-col md="4" class="text-center"> last magn. </b-col>
														<b-col md="4">
															<b-form-input size="sm" id="maxLastmagY"></b-form-input>
														</b-col>
													</b-row>
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
										<pre><code>SELECT * FROM TABLE WHERE COLUMN = 1</code></pre>
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
						</b-collapse>
					</b-card-group>
				</b-form>
			</b-card-body>
		</b-card>
	<!-- </b-form> -->
	</div>
</template>

<script>

export default {
	name: 'searchOptions',
	data(){
		return{
			anyBand: false,
			firstGreg: null,
			lastGreg: null,
			queryParameters: {
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
				dates:{
					firstjd: null,
					lastjd: null,
					deltajd: {
						min: null,
						max: null,
					}
				}
			},
		}
	},
	computed:{
		firstjd(){
			return this.queryParameters.dates.firstjd
		}
	},
	watch:{
		firstGreg: function(oldGreg, newGreg){
			this.queryParameters.dates.firstjd = "Hola Pablo!";
		},
		lastGreg: function(oldGrag, newGreg){
			this.queryParameters.dates.lastjd = "Mira como va la votacion";
		},
		firstjd(){
			if(this.firstGreg !== "1994-05-23")
				this.firstGreg = "1994-05-23";
		}

	},
	methods : {
		toggleAnyBand(){
			this.anyBand = !this.anyBand;
		},
		removeEmpty(obj){
			Object.entries(obj).forEach(([key, val]) => {
				if (val && typeof val === 'object'){
					this.removeEmpty(val);
					if (Object.keys(val).length === 0) delete obj[key];
				}
				else if (val == null) delete obj[key]
			})
		},
		onSubmitQuery(){
			let queryToSubmit = this._.cloneDeep(this.queryParameters);
			this.removeEmpty(queryToSubmit);
      alert(JSON.stringify(queryToSubmit));
    },
		jdToGregorian(jdDate){
			// const y = 4716;
	    // const v = 3;
	    // const j = 1401;
	    // const u =  5;
	    // const m =  2;
	    // const s =  153;
	    // const n = 12;
	    // const w =  2;
	    // const r =  4;
	    // const B =  274277;
	    // const p =  1461;
	    // const C =  -38;
			//
			// var f = jdDate + j + Math.floor((Math.floor((4 * JD + B) / 146097) * 3) / 4) + C;
			// var e = r * f + v;
			// var g = Math.floor((e % p) / r);
			// var h = u * g + w;
			//
			// var D = Math.floor((h % s) / u) + 1;
			// var M = ((Math.floor(h / s) + m) % n) + 1;
			// var Y = Math.floor(e / p) - y + Math.floor((n + m - M) / n) ;
			//
			// var day = ("0" + D).slice(-2);
			// var month = ("0" + M ).slice(-2);
			// var year = ("000" + Y ).slice(-4);
			//
			// var today = year + "-" + month + "-" + day;

			// if(greg === 'first') this.firstGreg = jdDate;
			// else if(greg === 'last') this.lastGreg = jdDate;
			return;
		},
		gregorianToJd(){

		}
	},
	props: {

	}
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
