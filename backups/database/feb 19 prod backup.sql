PGDMP  :    '                |            invoice_and_tracking    13.14 (Debian 13.14-0+deb11u1)    16.0 C               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16384    invoice_and_tracking    DATABASE     |   CREATE DATABASE invoice_and_tracking WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
 $   DROP DATABASE invoice_and_tracking;
                postgres    false                       0    0    DATABASE invoice_and_tracking    ACL     D   GRANT ALL ON DATABASE invoice_and_tracking TO invoice_and_tracking;
                   postgres    false    3099                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            �            1259    24718    alembic_version    TABLE     X   CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);
 #   DROP TABLE public.alembic_version;
       public         heap    invoice_and_tracking    false    4            �            1259    16399    bill_to    TABLE     �   CREATE TABLE public.bill_to (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200),
    deleted character varying(10)
);
    DROP TABLE public.bill_to;
       public         heap    invoice_and_tracking    false    4            �            1259    16397    bill_to_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bill_to_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.bill_to_id_seq;
       public          invoice_and_tracking    false    203    4                       0    0    bill_to_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.bill_to_id_seq OWNED BY public.bill_to.id;
          public          invoice_and_tracking    false    202            �            1259    16388    company    TABLE     Z  CREATE TABLE public.company (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200),
    tel character varying(1200),
    fax character varying(1200),
    gst character varying(1200),
    bank_details character varying(1200)
);
    DROP TABLE public.company;
       public         heap    invoice_and_tracking    false    4            �            1259    16386    company_id_seq    SEQUENCE     �   CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.company_id_seq;
       public          invoice_and_tracking    false    201    4                       0    0    company_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;
          public          invoice_and_tracking    false    200            �            1259    16493    daily__account    TABLE       CREATE TABLE public.daily__account (
    id character varying(20) NOT NULL,
    all_items character varying(500),
    description character varying(1200),
    date timestamp without time zone,
    vendor_id integer,
    bill_to_id integer,
    currency character varying(1200)
);
 "   DROP TABLE public.daily__account;
       public         heap    invoice_and_tracking    false    4            �            1259    16452    invoice    TABLE     >  CREATE TABLE public.invoice (
    id character varying(20) NOT NULL,
    bill_to_id integer,
    ship_from_id integer,
    ship_to_id integer,
    all_items character varying(1200),
    date timestamp without time zone,
    due_date timestamp without time zone,
    terms character varying(1200),
    extra_info character varying(1200),
    bl_number character varying(1200),
    bank_details character varying(1200),
    type character varying(1200),
    invoice_status character varying(1200),
    description character varying(1200),
    deleted character varying(10)
);
    DROP TABLE public.invoice;
       public         heap    invoice_and_tracking    false    4            �            1259    16432    item    TABLE        CREATE TABLE public.item (
    id integer NOT NULL,
    name character varying(1200),
    description character varying(1200),
    price real,
    currency character varying(1200),
    quantity integer,
    vendor_id integer,
    deleted character varying(10),
    vendor_cost integer
);
    DROP TABLE public.item;
       public         heap    invoice_and_tracking    false    4            �            1259    16510    item_history    TABLE     �   CREATE TABLE public.item_history (
    id character varying(20) NOT NULL,
    all_items character varying(500),
    description character varying(1200),
    date timestamp without time zone,
    deleted character varying(10)
);
     DROP TABLE public.item_history;
       public         heap    invoice_and_tracking    false    4            �            1259    16430    item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.item_id_seq;
       public          invoice_and_tracking    false    209    4                        0    0    item_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;
          public          invoice_and_tracking    false    208            �            1259    16475    purchase__order    TABLE     �  CREATE TABLE public.purchase__order (
    id character varying(20) NOT NULL,
    vendor_id integer,
    all_items character varying(500),
    invoice_id character varying(20),
    date timestamp without time zone,
    description character varying(1200),
    due_date timestamp without time zone,
    purchase_order_status character varying(1200),
    deleted character varying(10)
);
 #   DROP TABLE public.purchase__order;
       public         heap    invoice_and_tracking    false    4            �            1259    16410 	   ship_from    TABLE     �   CREATE TABLE public.ship_from (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200),
    deleted character varying(10)
);
    DROP TABLE public.ship_from;
       public         heap    invoice_and_tracking    false    4            �            1259    16408    ship_from_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ship_from_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.ship_from_id_seq;
       public          invoice_and_tracking    false    4    205            !           0    0    ship_from_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.ship_from_id_seq OWNED BY public.ship_from.id;
          public          invoice_and_tracking    false    204            �            1259    16421    ship_to    TABLE     �   CREATE TABLE public.ship_to (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200),
    deleted character varying(10)
);
    DROP TABLE public.ship_to;
       public         heap    invoice_and_tracking    false    4            �            1259    16419    ship_to_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ship_to_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.ship_to_id_seq;
       public          invoice_and_tracking    false    4    207            "           0    0    ship_to_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.ship_to_id_seq OWNED BY public.ship_to.id;
          public          invoice_and_tracking    false    206            �            1259    24710    shipment    TABLE     �  CREATE TABLE public.shipment (
    id character varying(20) NOT NULL,
    invoice_id character varying(500),
    issued_to_id integer,
    ship_from_id integer,
    ship_to_id integer,
    all_items character varying(500),
    arrival_date timestamp without time zone,
    due_date timestamp without time zone,
    terms character varying(1200),
    shipment_status character varying(1200),
    description character varying(1200),
    container_number character varying(1200),
    bl_number character varying(1200),
    shipping_details character varying(1200),
    type character varying(1200),
    deleted character varying(10),
    weight character varying(1200)
);
    DROP TABLE public.shipment;
       public         heap    invoice_and_tracking    false    4            �            1259    16443    vendor    TABLE     �   CREATE TABLE public.vendor (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    deleted character varying(10)
);
    DROP TABLE public.vendor;
       public         heap    invoice_and_tracking    false    4            �            1259    16441    vendor_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.vendor_id_seq;
       public          invoice_and_tracking    false    4    211            #           0    0    vendor_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.vendor_id_seq OWNED BY public.vendor.id;
          public          invoice_and_tracking    false    210            e           2604    16402 
   bill_to id    DEFAULT     h   ALTER TABLE ONLY public.bill_to ALTER COLUMN id SET DEFAULT nextval('public.bill_to_id_seq'::regclass);
 9   ALTER TABLE public.bill_to ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    203    202    203            d           2604    16391 
   company id    DEFAULT     h   ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);
 9   ALTER TABLE public.company ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    200    201    201            h           2604    16435    item id    DEFAULT     b   ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);
 6   ALTER TABLE public.item ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    208    209    209            f           2604    16413    ship_from id    DEFAULT     l   ALTER TABLE ONLY public.ship_from ALTER COLUMN id SET DEFAULT nextval('public.ship_from_id_seq'::regclass);
 ;   ALTER TABLE public.ship_from ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    205    204    205            g           2604    16424 
   ship_to id    DEFAULT     h   ALTER TABLE ONLY public.ship_to ALTER COLUMN id SET DEFAULT nextval('public.ship_to_id_seq'::regclass);
 9   ALTER TABLE public.ship_to ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    207    206    207            i           2604    16446 	   vendor id    DEFAULT     f   ALTER TABLE ONLY public.vendor ALTER COLUMN id SET DEFAULT nextval('public.vendor_id_seq'::regclass);
 8   ALTER TABLE public.vendor ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    211    210    211                      0    24718    alembic_version 
   TABLE DATA           6   COPY public.alembic_version (version_num) FROM stdin;
    public          invoice_and_tracking    false    217   �R                 0    16399    bill_to 
   TABLE DATA           R   COPY public.bill_to (id, name, address1, address2, address3, deleted) FROM stdin;
    public          invoice_and_tracking    false    203   �R                 0    16388    company 
   TABLE DATA           f   COPY public.company (id, name, address1, address2, address3, tel, fax, gst, bank_details) FROM stdin;
    public          invoice_and_tracking    false    201   W                 0    16493    daily__account 
   TABLE DATA           k   COPY public.daily__account (id, all_items, description, date, vendor_id, bill_to_id, currency) FROM stdin;
    public          invoice_and_tracking    false    214   kX                 0    16452    invoice 
   TABLE DATA           �   COPY public.invoice (id, bill_to_id, ship_from_id, ship_to_id, all_items, date, due_date, terms, extra_info, bl_number, bank_details, type, invoice_status, description, deleted) FROM stdin;
    public          invoice_and_tracking    false    212   �Z                 0    16432    item 
   TABLE DATA           q   COPY public.item (id, name, description, price, currency, quantity, vendor_id, deleted, vendor_cost) FROM stdin;
    public          invoice_and_tracking    false    209   �u                 0    16510    item_history 
   TABLE DATA           Q   COPY public.item_history (id, all_items, description, date, deleted) FROM stdin;
    public          invoice_and_tracking    false    215   mw                 0    16475    purchase__order 
   TABLE DATA           �   COPY public.purchase__order (id, vendor_id, all_items, invoice_id, date, description, due_date, purchase_order_status, deleted) FROM stdin;
    public          invoice_and_tracking    false    213   �w       	          0    16410 	   ship_from 
   TABLE DATA           T   COPY public.ship_from (id, name, address1, address2, address3, deleted) FROM stdin;
    public          invoice_and_tracking    false    205   �w                 0    16421    ship_to 
   TABLE DATA           R   COPY public.ship_to (id, name, address1, address2, address3, deleted) FROM stdin;
    public          invoice_and_tracking    false    207   }                 0    24710    shipment 
   TABLE DATA           �   COPY public.shipment (id, invoice_id, issued_to_id, ship_from_id, ship_to_id, all_items, arrival_date, due_date, terms, shipment_status, description, container_number, bl_number, shipping_details, type, deleted, weight) FROM stdin;
    public          invoice_and_tracking    false    216   {�                 0    16443    vendor 
   TABLE DATA           G   COPY public.vendor (id, name, address1, address2, deleted) FROM stdin;
    public          invoice_and_tracking    false    211   �       $           0    0    bill_to_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.bill_to_id_seq', 20, true);
          public          invoice_and_tracking    false    202            %           0    0    company_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.company_id_seq', 7, true);
          public          invoice_and_tracking    false    200            &           0    0    item_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.item_id_seq', 16, true);
          public          invoice_and_tracking    false    208            '           0    0    ship_from_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.ship_from_id_seq', 42, true);
          public          invoice_and_tracking    false    204            (           0    0    ship_to_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.ship_to_id_seq', 22, true);
          public          invoice_and_tracking    false    206            )           0    0    vendor_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.vendor_id_seq', 4, true);
          public          invoice_and_tracking    false    210            �           2606    24722 #   alembic_version alembic_version_pkc 
   CONSTRAINT     j   ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);
 M   ALTER TABLE ONLY public.alembic_version DROP CONSTRAINT alembic_version_pkc;
       public            invoice_and_tracking    false    217            m           2606    16407    bill_to bill_to_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.bill_to
    ADD CONSTRAINT bill_to_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.bill_to DROP CONSTRAINT bill_to_pkey;
       public            invoice_and_tracking    false    203            k           2606    16396    company company_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.company DROP CONSTRAINT company_pkey;
       public            invoice_and_tracking    false    201            {           2606    16500 "   daily__account daily__account_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.daily__account
    ADD CONSTRAINT daily__account_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.daily__account DROP CONSTRAINT daily__account_pkey;
       public            invoice_and_tracking    false    214            w           2606    16459    invoice invoice_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_pkey;
       public            invoice_and_tracking    false    212            }           2606    16517    item_history item_history_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.item_history
    ADD CONSTRAINT item_history_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.item_history DROP CONSTRAINT item_history_pkey;
       public            invoice_and_tracking    false    215            s           2606    16440    item item_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.item DROP CONSTRAINT item_pkey;
       public            invoice_and_tracking    false    209            y           2606    16482 $   purchase__order purchase__order_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.purchase__order
    ADD CONSTRAINT purchase__order_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.purchase__order DROP CONSTRAINT purchase__order_pkey;
       public            invoice_and_tracking    false    213            o           2606    16418    ship_from ship_from_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.ship_from
    ADD CONSTRAINT ship_from_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.ship_from DROP CONSTRAINT ship_from_pkey;
       public            invoice_and_tracking    false    205            q           2606    16429    ship_to ship_to_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.ship_to
    ADD CONSTRAINT ship_to_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.ship_to DROP CONSTRAINT ship_to_pkey;
       public            invoice_and_tracking    false    207                       2606    24717    shipment shipment_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.shipment
    ADD CONSTRAINT shipment_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.shipment DROP CONSTRAINT shipment_pkey;
       public            invoice_and_tracking    false    216            u           2606    16451    vendor vendor_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.vendor
    ADD CONSTRAINT vendor_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.vendor DROP CONSTRAINT vendor_pkey;
       public            invoice_and_tracking    false    211                  x������ � �           x�]T�n�8]3_qf%��Jfw-��2(َ�n����RG�ә����Nw�����N���A��{��C_LS�/�F����5���F���P,��A�3�#L�45N&�\����\�ٚ�A�$��b���P(1Y�8�sG��׿�{E�6��i�@��ܨ w�H��;A�4aI98�[o0p����p�O��`->h^W}����si�(���5J�Na$���.�*Kq����ФΩ3����z��3�a����;��EW6uQ��q<v1)�n��7Ǻ�����{= �m���i����AZ;���8c�*Ϡt.�����&�I�T��	��x3%<�f�y!�:7?�*LzO&�2�v�a��/k<�`�X͙��+��0�\�t.1�?F"�����jg˽m��O��;��}=l�mڏf�Oz}ie,�\!)vE[�%��Ue���z�xr�I)��Ӊ
�;��v	x4�HuNF�ܻ��Έ7�b�����nvu�a
{b�cYm��	=L��i�������n(�vEUn�����v���n�����q�٣���8nKP[<�Ź�[�/���Sy���A�~�;�cDeUʭ=��hY`ǲ�x�E�TUyp�����<o����.�z���fQ�bZ�*B�{7|���d�ed�L��b2z��L�;zpX�1%4���Nq]bNw�*���-����J��t�������5�փ�G���b�H�R"cyNR�.f�#NR�d��~Ü�s�u|b;)��g{o�b��C�D��������-�=!���q��Z̪汨�����CY��=�U��g�����kp^J�����.p�R���Ĥn����#$��>�H�s����a�j��`�/��`a���i�!������*.��7+������"���K,�z��m�L��ӛ��[�ׇ�FJ�h��%���]$����m��U��/Ƿ�h9>��<�H�#i�_���BN� BH�B�.b%��ǂ�P����;5h����bB
$������������         I  x�eQ�n�0<�W��s,l^7B�
5@��V\pb��S)_C*�U��zgggvb����v�c^7yV;��h��`Z����0m�U�3�"��]��*�q2>�	8�I�C��ĖahD���~>��>�<;+&ΐ��Tf) ��]xsC���(�F�f0�� v�QL��؂%�H�N^��Ĕ,�^�K�m �=�U�-������,�����Uk&!3"�����ZO�'	�٤М ����(9�n�� �'� c���Of�K
8�+�b3sq��C70u�6�w^ڨ�p��������ˡ����9����Ҋ�s[���1�v         k  x�͕Mo�@���+F>����7���T>$�HHMY`�Ub�mQ���5B�&DT�j|X���}�w��x�!��F־?ֲ0�jH�7	mR���o-���u�<A
�F�<�L0?s�	7<􆽁7?	�t�J28�W�;�#����3�i��h;-p�8�̎(��8x��N���a��E���4�Z'�t�#R�߆�l�<�����qe/�jǀ�*�NҲ`�<�6�~�8�k~�����9|��K@iI�����P�pf�
����l��i
-@� ��;�=��������7`4��qo}�
h{C�����@IF��ջ��oa0�`пzT@�Q����
|�MA<!	���t����k� [T�>!�|��_v�q�o��KLZyƉ��TZ�N��FT�+K�\%���{��`%8/�AE"ć:)w�UFR&O��Ǽh$�� �2��x�sNTp�*��#R*W˫@����/��u���	s�U����� ��p�I��@l1�L��6O�W;A�n�0�/�2��U�W���-Ϟ�*��%WB>�^�'�Du[�R5iI3c�R�e�*=T����_Q&�ۭ��H�+[T~_y����� 7aM�            x��]�rY����7�b&�g$|�E�Q�$J,*�T�1�%l%%j@�rOLļȼ�<ɜ�ɒ@
�H�ݑ�CF7��޳/߭�ߒc¤S�q�{�_��Ǜ��zؿ��'������n��G��q���+puB�	���~<"?�o��>�ݻ���>�%�A����8��*H{����+���>"+w�T;�����wݯ�Իw�ȩO��sªbvK��%|��J�/����(ygn���]V%.�����~����z�K2β\�$.y�onS.�����q��1���JO��17���_G��JW$�ҿ���Q'�=X�r��x� w�!Lk�[��wZ�Nx�yDؑ�� +�ֈ*0C;�U�����V�Q'W�j��V?(/8-�HpQ.�&~���J~"g�_���JFj��/U�p�*�v��I%�4�uq��	�������������F0%ї~�wf�a7������NX��<�8 ��ǎ*�����?����Y�/��{�\f��p��7�)\,�D�S+`��77��h����8�Y�'!�?z��Ҩw�	�d�w��M�\})	s��%LS��k��Z������}��Z�X�������1~�Jx�x��	�1К>�)�F��$�[����1�0���R �(�*g��	�^%�c ��u��*�+ŕ��s�c)\?�\��[��O=���M��x{��K왪��s.�҉��F<�̓��ɧś��H�I�T"��&p����[��-Z>Yx	��y
&�&��מs�ǯ�I���mx&͌B&9ILrp�/W����`�!����~���`��%�H--jFԍk4cs�ɟA7���4��@r�*V؈�w��f�;�UP�p�Z�޺h4� ����Q�����c�ج4HU���+x�z�4g`�F/��̦��L{5쑫��ۅ��H�\����b)h���e������.�j��O�w���6�~A�$��������Z!���@X.:!��"6A��P��P�g0 ��	gj���X寚��?AEDr��Hџ��/��~SA�����5=�F2a<�1�U��/����/0J�g3]�Cr6��?/܄9n
6��X���N�͇u�U�vW)ڽ�H��Z,��w�8��R圶�
�(�#�,��;�)�~���}4�Q����G�ǅ:�X:gs����A�s�1���X���������7a�*�j*=�T����Jp�S�0p�F��it?����n�J������?n��4�����O)���Q��F�<��-��ʘ�(��'�1�*�V�IN��`���b��Wh� �S�a�Q��TFc�cs�=0�k���)�)�/M5o�c���1����a�Nh��xVN�8lC�(݊��k��SD�᷍5V�\�d�
L��Ҿ����q�3�����4ܑ�v=K<Q�Ȁ��������?��5s�G�>⿯aH�
�"7�Ѩ�A_Q���y��$l�r��<��O���"|���\te]�(n._!Z!7b��yV�g�ҕž��6��ֲ�!6���uKJ��I5S|���^cP��Þ�9��Y7�����+m�dN'4�Dy�Nh��uy-Rb1�7����C

$��2�*��X��Js�	@
U&{2���^˕Iၙ�e�b�bN*�1/���њ�����ᴗ*��������O��'�$����8o��1�-�G�<6܂J�C��͑if@����1M���kfǒ��,AET�VJ+�a��E�o���,sB�7o�l���J�zZ�B�T�σ&����0$..<�^�n"�[Yw)�����g%fz�q���ǌ>��kiT��u�����O�ґ�|�*�s������g�ٌ�i@�,h�I���'���me$gʢ0� �$���6*FП���{�KS�css��Y��Z�6���Q�C�!ǄRQ�S��r&J����gK��,d2�w�o��d�؎S7�"�f*֥�6c���WJLSԊmC��X������ӂfQ? �u���O
��BF,�j4?DV&ͭ��:2 �5Q#��g��j"T�-蕔܋��ʮ��-x6L�����mQzU�%�N�+��N���%Ţ�R2�-\k��$Lh4���6�I6BK�%��ܼi�.��@ӹ\9`����r��B[5ڬ�G�2������ic����=6%i��{lJV�h�,3V�����Z�w�Ὂ�����Y{tU]%�F
��'�7%�=O2���6� ��BZ���x��7h����� ���<�j�:��UrQk5�4e2����:7�R�ڃYT#��^7�hYP��>��49��'���'˸jA�����V^1�V��9|�&O�:"ʔ0 �ߡcl�Aey�F�3���]G�tU�YF?j�|�r�������/��)��ᩚ��(�����P';!X,� �ċ1��N�@��8Luw��Fv����Jq�K�FC9��[젡�;h�THfU!m�$`�,��:S+�g"1����:n�;�e�cZ A�Զ�G1��@JWո�FQ������Sɇ��1���6�hA�	,1yO����n�'�B��7��+�a1�ܱ��Rbϰ0y�ìV.U�b��mW�j�z_��K�X}[�U��f9�=J�_VJ��DR��?dT��8�qTi<����tӍY�Q���n�f�<���R�#�=y֎�`6*^p+]�	�$��,9���]`��.7*z��V�ݍ9el�L�Q	�ˋ��Y������@d�o���g=���|3��Ǥ&��'�.j���V[�V\���K�:�p�������*"��g:e�8��t]LW6��cg��D�_��ԯ��eT�H���P�t�j?j���i�T��*�����0"%{XO[�,�&�nh�8Z�g�7�	ױLL�u��p]KR���+��g��G�s����ی���wSl�%~�@�c`��{Lf ���6�|�iL���%�� ʱc^�V#��� ����'�Ƈ��P��vVsgU|�M�����NR�G�Ok�ا�-���g�a�K�K	ɍ�<���z+)�R'�)��S�;���bb/b�A�(""����ӎ���8��Ji��P]br7),�K���r��/�+o
����g��6�L:11Lӂe�*'7LSS�k��R�M�'��`JjU���%MR��L�15�1R�~_,"��f�W40���+�Zj*�脘\��J��\�&���SZ���a@�����f���H���*�~a
I�6Rn�e���KAPM��L�I��)��RZX���ɇ�/�w\hLι#������ߨ6�%D\���đ�Gc����CuKr�<d����P��2�X&�cY8w,`b:�PZ����y�%s�
P��4��JR�����j�F��B�A��UJ��S]t��n�y/������ 7�eZNwK�����]��E�Rч��1�� ]	eiNB��#�,���r2z	)���ˀ�]��I��)T�+C2��V�.n8B&H������*�0g�.���E�	�E�	� [�^�b7F�NK��H�w��-8w�Fq��l���Sq��񑅂ۛ;�#b)θ���~�ъR��p�;l�y�W�Z3hc�=h �lS�e6dq��=hE���i���1�$�4{��i]N�!A���b������w�>���\xfXIRo�y��A�b�9p�Aw"Vd"S�$1�]��Ԇ�&�����дLlJ�؜�RlFX�u�,%#����D���l��Ul���rd��xp�x���~������&x,3o�R���a�L��T�����������=��5@l��^z}���.�LK����b�6�#.���Z���]�v�x��l=�=�4�J�خ�,��܌0���١��i���e��IM�1��l{�j�����	.?�0�r���n�Ĩ�Q���͗gTSn�|�"#U�RY�Z� �o�~4�
j@���\�WA7_��:g-��8ƽ	j~�mQ��95� <6��-ș�at��P���S�;�E���T("O�T`hj �
  ��ԋwy���-�����K�	S=g�.ۮLs]�6�/ިlӽ�ܦq����b��.h����J(�c�"��wx���	�P���
��g6*��)��� �u8c䕁��f��2d3c�����nM@N�%v�¥"@
57JlP�0Z��a��.���ET������\�ԝ�	'�X�X7��^Y8m�qJ�k.�R2�(�E�+����T�2��Eʜ�w�9�E��!�
���nX���<R�����HcbA��lfc�r,�p�-?�d6q^�˫�P��;m�7fH�ٸ����*�H:���`�k���Mۧ�᱖l1���!�o��D{AɯrS����H�1�X�|����%,�֊y����p���.B�i�R^Wm¯���?����.����8����䘗���6���t��B�Y5d%�BHoCU)5�ɱ��qo�Ϙ�����_�hE�A�8O���{�}�oMM�o�ިB2�ƒ�� <��9m��*��&Ǣ����)�<�ձ@�Q!T��;e�����H4Q�@�����џ��������_�
׃�%���Ԋ�`���:݈����{L�1�'��-�X{���ejۉ7$"t�[�<>g�*D{���E7B���-XX��K7��Jg�K_dc��$�|Rrz�=�+>I�pG����zkRE�c+������b�F�����%AZ��jٯ6Zq�dU'Ĭ	��:˘�u�T1�Nn۴��;A������W+�wd�l�5]N���ì�zw�a���[�f�m��b�䘇�8�K�1���͍���&���h3i����f�9���^s�c�1�&�y��<%��������A�&;,�
��؂BE����ܵ߷b�㝃Z<�h;�Ẫ6~�*�㉔��N�4�ϟ9�+ww��of��)p��c����X
�[�N�Z8���ɛ7Q�3߶w��&ps|��
��W��Q���\'�E��R??-�wBv6?nBuy�:񎭉���Y+�ކ���o�����>TjE��6�����.jk��#�>�U((���J������xo"f��`��N:n6'ͭzpv@��U�k)4!�F���R/7	HI8J�7���&k�8��  A�~����	����e&�E���1TwA�1$�r�,n��ҒD��V۰�JY0Ʈ(�=C����_�cr�x����̼��S���j��*�j��$��r�p{��ObR1	/�b��!�Ji"Ֆ�����Ȝ`�n�RF�5����dSfm�U���.�蒹\)�s��,�N�w%m�86�N��5/ۜ[��l�K�eN���9h�h�uDkܦ���*J㾒B��M��X��N����3���RC��>����LY�?I��T�o#V ��b|���ITI�����Ag�1��(*�?�?��=ܢ"�B�c� �����#���#�(��#�Q���b�BiNV����=��H�-#�Q��y���ű<���̴=�+mg����M]�5k!TǄ5�F��f	��׀�:\�8`�����:f4sGO�Uk��>�����|����m~/t�'�՝E�N0���f�di��5�4�;M�-���_��1��#,��K�7&Dri�}�w�A��W�������������wz�1~�iAtS�p�L��{�#׷�9�t�i����~�	�5���s���H�+��1sȸo��]��~W"�YL�=�U���j�
܉}�_�V����*loZoo2xK�T���ZSK�)��T��7���G��\��S�mT۵�Ig��>��R+׃J�ê`T�w��Z�Ti} �ph	1*�$���w���E��Eq�	��J��&UP�p��W���Z0��J[X���	�laOv� �RT��n��G�6�X_��Й�� }�q�.�@�(񦭾 Lԛ�H_��g��f�	9#Is�^�K�qd��~n�v�a&�а�sKv�v����wA�v»��p�Sfl����WΞY�������N�� q���^i���i�⓳J�U.Me1"�&d�>��N��Ė�ͣ����]'C�����W��,_����->߽�}e�e���-���Kv�y��֚Q�d�O���oZ���9��u�,(F~�>��I��@g�R��e�v�yؽ%*4�T\r���L�!�	B��J�3>L�&�m��a��3�ʗm)9u**��)SJ�7�'��x�Xg\����*m@h����i\�s�_fN$���B��t��@�0=n͚����v�&�CS�<4�In�@��c�Em��ו��^��U\$���FS%��2l.���\�����q�Ȼ~x3������H�#u�|{�n���E��t��#��V���q���>]օ'ݗ��3��o��<t��x��<���"�Ս[V����;�|SHU�b/�h%(��'M� )N�p�{�JM	��G.���D��b.��(�ȹ?"7����� ��y��p�
"-���A�<��əd�e���2F���)r�D��I�Lp��[|nX6Zm
쫌H�����: r�b��V񛍳�)|�ZU�����P�ߨ��&	ʭ`%8w���O��5�Y$h5�K��rӿ(�K��L�_��VNظ�[$����Ix+��Q[J��5v%M�O����T1{տ�����C��Q��R�Y�c�]�@�<������M��=�A'!X�s���YIr�l�� A��'܆��[������䣙~�"�~���Qw��         x  x�mR[O�0~>����'��v�O�M�������@��0�4���0��I�sN�[�(R����G�������[Y1i�}�jSU�;��<�¥ge6X4{�r�k�X)��$E�V��q��O�.�wm��v��nq�>�SOꈶߨ.n"<�C�� n3�e�t{X�TժJU��1��� l���a����'n����6��p��t�d�Y� �=�Y��<O&]̒,L�3LD?�-}�!qߖ����/؞Rq��G�:�
�Ev��u�) H渖��D/%�9���D�'�@��g�4��W�n�}���})&�IAaapgt��P)�z	�������²DQa��?wI���٣������/!��^9�N��$�#            x������ � �            x������ � �      	   �  x��W[o�H~��GZi�[r��` �V؅]���}	͋�`5�3`2����m�؞26�tk�Wj)�s��w�s�"I��8}2*|��@. ���-S�\�ka�X����h��)�6	�;��&�n����h�N�@,��A���&en � Ӯ�i�0����&��M��!�̃l��oC@G�[T��PH7�*�4�κ<]�6����i�n�*���d��TŹ�b����:����' ���
&���%i�J!#���Y(�i�~o#Š=<��4lS�� �}��_a��7��f���E��]]"�A|x�9$i�XJ4eq(�R`�TP��搈.Ә.����P^L})���H����(����L��ŗz��
J�xhzX�����q���)�&TI���D����٣3�\A@���
�>�[Bf��sӔcd��4�,認=�����`� y�o�޷iL_ ���c@����6�n[�����``F�?�b�������ސI��@}&�؎����&�]�{	�������}���,��:*o�4��G^m���9:����~{<4�2�A�R��)�q�1��������Eu, ����T���+�?q��Y��~�R�I@ci��������k�d�L�_��}c�C��4�H���w*H_zN��+j�����Ql+��8Dt��`J�T�+b����$㡧�FQii
!G��(Rʳ:qe&�Y�`�m�w��"���2OZ�#�2G`Zƭf��LB��>�ېru��S�f���_n�ҁ�R�I'�A0N�w�{�ZuO�&_�X�#��i���t����2ɫ��ٷ窌���0�V�s�> ɪ�KS,�(_�US���uC���h'��`0���yL&�RxXn
S)=@�	�
 �
��%�L�_a��T�2�N��^2C�fxJp?�7�3zc���K*��[���Z1tZ�PƐ�k �c���⠾��|C�Y)�:���04̱������c��������R��A�A���E�'�0�% ��h'ZoR���4���؊�g����\��r��ؖ����`�tr�R��8��dXd]�̳V�[��U.�-At�	�e��d-�Y��<�LƝ�@W��%;	�#�	NG�ju�w�#�Yu5v-���k��/ESVO����ι�%8�@�4�3-��Y�oa�rh�jl9D��D��g�j�S�����	nC[�	�(����gj'�I?c�E*�iq���V;7�
XC�ֵ�/�*-��t)7����¡�HP�v�M�0��ѝ���}��Տ(�H[̍=��~. ��� i�t��]��#ou"V�ۂ,9�0&ӄ�RH���Ux�����Ez�N.4�م;�sv&���ƕ� �W[�A�F3�+��U�0����S�yj;Պ�6�)�c�UGk��� y���?����U��E���9Ǘ��WԞ�� ,�˦�t�KQrGH�)�_{�X�����B��/�,_Q�PߞqMP3~�t�
�¼y"��r����r����R��u��E�o�׮ ��0d��P+�ӴQ���	�"'*j]�t�6ޏ���F��d�|��P&���U|V8)�,|��
U�;������!s�$��ʧ3Jĺ0Gq�ـ�/_�����X��[�zKC2����/jPmY=5B��$B���4��h�i�����p�C	�n�ɱ�_��x��K�{�7s��Е���<���s��\UuL�-e8�\��H�� ��%(����|E��nk�ϖ]�RIť�.��5o����L��G�� $���_�!l��h���ּ���5����4�P_!�@��_�ka�	������$5Zq�����j�,e"��>��ڃ���ғ����o��x�����u7���]��6�J�N�"��ߌ�[ kl[��3��`�,A�}�ʕ!�It|~�K�^�G�?|��̊7U         �  x�]U�r�H=���RI�H���F�f� ���K$�"�B��-���������|ɶd��J3����u�-�jߝno/����ɻ�V9EJ�|� �y��He�L �jS?W������{�gh!�Tj��0�uz�8�p�4�F���!|R�y ��ry/�]�������/�w�����*�ڶz��uW��7����.1w`�}F
#}g��G=�܃b�M�i�}����j���;Lv�&�^�*w�׶��OqL����J*M���V���O1������	��� �����i���'��c�rW������hD�X ������y)7��f׵U�� >��j�p���\��(T�� �"��2�e�1�I{��ϵ��N8�^���)b�cSxK�dfH8%S����ȅg���BQF
I��H�EJ��K�r.�4eW��~��~2��ޭ���ߴߛ�����M*�h�\�V�|�T�e�j�0����
2m��q��+��	���7R�#c"��딳��$%�������#yGhGJ�����aWR�W
�����b�i��	*�d�c�p�ضŔ���Dƒk!9J.�>|Cє53R��3��6���>�of�~c���:���m�|1D����4D(�i�s6Db+g����|d��V�m�C^��vͦ�ZW{��zߕ;� ���=�d�}Va�,�$�G��TgL���S��X��_zlR��F�2����D֯_\"�J�B���� @ޟ^���k8c	��Ϣ@��R�����[�S�"W�=��3��7Ƥf�t�#���FV(����k�]���質&z�/01'U�H���.�D�C��%n���['(�f�)&tNhZ�_�oߊI��K?D�"���N���`d�f�����8��K�]=�ɹ������r$2Р,�>3���hߐ�-b2Pz�>gb��	h��S����Gjs�d�[r�B��X�����Ts����%ĝ�!�g�1��µ�8w܆~a�%�N$�S��Vk����i˧-�s��)k~�)�|)���u�oo�.��e��f7�/%w�{ᙑT�zW"m����僘e��q�<d�e���4��&������������cY��c�0i�
ͮBPx�e.����q�ƛfW�L�v�gK��M�g:m�|��<>�u���j;������w.�78�R�1侫W{��Z��<h�q^bQ�ggW�|�Sر{>��wuu��|o         �  x��U]r�F~N�/��U�<I�	!���X� KEy���PE�K�S�W�Yr�\a[�#��#T�4���~�ѻ��E�@8���\B8���w�)�}������}5v���n������rl
�'���ӻ�R�!���N'?���_���ܞ�:��ҙC'��\}P|]l�2��p�7�R6Us,�E�0�Q��Ҳ�Y^�l��"����g��_`���P�0}�??�%ޫ0OL��q)�t�1=���(C%�q�%��B)F�-�y�\0��L�1������@bv�ȟ��ԛ�����+�/�65,u<�������"�[Z�����ϲ(�i�K,z`"?y� x��K?	����]Xݼ*�?UsI<���x�%^���T~�j�x�޹%����1i���S��K�;�Č�I�IA��XsI�j�EFfûx0]�4[s�P�|<i㗻��7���KB��o��K�N˛y�/�^P��w_�EaI���T�TzȞG�h�?�<o
����B����u��&�M������j��T�U?�f_ۍ�Tc_8�u<� M��6�4h�X��*���:/gQ����mġ�����V��~1i0cS`�k�`�u���bhE�?��l�.]��IA=�A(��,��8<׻2�'��u]�������8D����� ����<n[�қ�X߂m	No�Ʒ$�'�����9���զ*vǗ�����i��t�-=�.��t@�1�P�*`�C?vcH'�z�;G�'ahNc�{t�q�B�:Dw�i�pg¥8��e�IF��BF�a�gQ}���;ڥʃ�"�����'��}ߟVۢ�t��Bq�^q�@W0�K�������F�+=u>���mݑ�K�96����Ӯ����8u4�����g����z� ֳ         �   x�M��j�0����	D��y����Ӂv�
�	ڠ&#
{�i�F�8p���bRWMU�OW�K�Eσ﹓Z��|�>{m�֠���� !{>	&�$�:an�_B�zZP�vw��t^:�8�H-�]��ǿ	����&�g��:=[l���e��)B7~�܌`7�w%<������嫙�Nګ��E�����v�	���:k5`[���!=��߸�9�A� ��]�     