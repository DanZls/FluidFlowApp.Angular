# FluidFlowApp
Web project implementing a mathematical algorithm of hydrodynamics for calculating fluid dynamics around solid boundaries.

The model represents view from above on a rectangular area of a hypothetical unbounded in any direction pool, filled with fluid (e.g. ocean), which is considered as ideal fluid. Static boundaries are borders of immovable solid objects (e.g. islands). Dynamic boundaries are borders of a shape, formed by liquid, lighter than the main one and floating on surface of the pool (e.g. an oil spill on water); this shape can move freely with the underlying masses of the main liquid, moved by current.

Overview:

Adding model parameters in an interactive window

<img width="1920" height="902" alt="313426186-26d34e31-8777-4589-bf2e-c41f6c040fd7" src="https://github.com/user-attachments/assets/297456fe-9102-4d33-aea9-c006f980db6b" />


Observing flow simulation results after calculation and saving to a database

<img width="1920" height="917" alt="313426119-35d7b099-f766-4274-a4d6-97b9478e17b3" src="https://github.com/user-attachments/assets/67128690-a26f-4c68-9433-e207c7ae55e0" />

<img width="1920" height="907" alt="313426118-7e5ead3a-c53f-470e-b70e-48e85d49f299" src="https://github.com/user-attachments/assets/8e812fbf-a904-4113-ae52-e2b5bc731273" />

<img width="1920" height="913" alt="313426116-6bc1357f-26a4-4864-b02c-9aff3292dc5a" src="https://github.com/user-attachments/assets/2ac7f683-700e-44a7-8f70-e8ab72f23d3e" />


Checking logs for troubleshooting

<img width="1918" height="908" alt="313426019-b968c919-918d-4bac-aba4-cb5de7ca30b2" src="https://github.com/user-attachments/assets/1ea4117a-9551-486b-ba81-04ae00fde168" />


Theoretical description, justification and usage examples for the used simulation method can be found in following publications:

[1] S. Dovgiy, I. Lifanov, D. Cherniy. Method of singular integral equations and computational technologies. - Kyiv, Ukraine: Publishing House "Euston", 2016, 380 p.

[2] S. Dovgiy, P. Vasin, D. Zloschastiev, D. Cherniy. Method of singular integral equations for problems of fluid dynamics in a region with a free boundary.// XXI International Scientific and Practical Conference "Information-communication technologies and sustainable development", National Academy of Sciences of Ukraine, Kyiv, Ukraine, November 14-16, 2022, p. 37.

[3] P. Vasin, D. Zloschastiev, D. Cherniy. Algorithm for fulfilling the impenetrability condition for the method of discrete features.// VIII International Scientific and Practical Conference "Computer Hydromechanics", National Academy of Sciences of Ukraine, Kyiv, Ukraine, September 27-28, 2022, p. 11.

[4] P. Vasin, D. Zloschastiev, D. Cherniy. Algorithm of computing technologies for problems with a free boundary of separation of environments.// VIII International Scientific and Practical Conference "Computer Hydromechanics", National Academy of Sciences of Ukraine, Kyiv, Ukraine, September 27-28, 2022, p. 12.

[5] P. Vasin, D. Zloschastiev, D. Cherniy. Computational technology for problems with free boundaries.// VI International Scientific Conference "Modern problems of mechanics" (To the 70th anniversary of the birth of Vyacheslav Volodymyrovych Meleshko), Kyiv, Ukraine, August 30–31, 2021, p. 45.
